"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  type DamageComponent,
  type LossComponent,
  type AdditionalLoss,
  type DamageGrade,
  EMS98_SCALE,
  REGIONAL_COEFFICIENTS,
  BBB_RATES,
  calculateDaLA,
  convertCurrency,
  formatAmount,
} from "@/lib/dala-calculator";

type Tab = "damage" | "losses" | "needs";
type Currency = "EUR" | "USD" | "UAH";

const EMPTY_DAMAGE: DamageComponent = {
  id: "",
  name: "",
  replacementValue: 0,
  area: 1,
  damageGrade: "DS3",
  region: "other",
};

const EMPTY_LOSS: LossComponent = {
  id: "",
  name: "",
  monthlyRevenue: 0,
  downtimeMonths: 1,
};

const EMPTY_ADDITIONAL: AdditionalLoss = {
  id: "",
  name: "",
  amount: 0,
};

export default function CalculatorPage() {
  const { locale } = useParams<{ locale: string }>();
  const uk = locale === "uk";

  const [activeTab, setActiveTab] = useState<Tab>("damage");
  const [currency, setCurrency] = useState<Currency>("EUR");

  // Damage components
  const [damageRows, setDamageRows] = useState<DamageComponent[]>([
    { ...EMPTY_DAMAGE, id: "1", name: uk ? "Житловий будинок" : "Residential building" },
  ]);

  // Loss components
  const [lossRows, setLossRows] = useState<LossComponent[]>([
    { ...EMPTY_LOSS, id: "1", name: uk ? "Втрата доходу" : "Income loss" },
  ]);
  const [additionalLosses, setAdditionalLosses] = useState<AdditionalLoss[]>([]);

  // Needs params
  const [bbbRate, setBbbRate] = useState("bbb");
  const [priorityInvestments, setPriorityInvestments] = useState(0);
  const [additionalCosts, setAdditionalCosts] = useState(0);

  const bbbMultiplier = BBB_RATES.find((r) => r.id === bbbRate)?.multiplier ?? 1.3;

  const result = useMemo(
    () =>
      calculateDaLA(damageRows, lossRows, additionalLosses, {
        bbbMultiplier,
        priorityInvestments,
        additionalCosts,
      }),
    [damageRows, lossRows, additionalLosses, bbbMultiplier, priorityInvestments, additionalCosts]
  );

  const fmt = (amount: number) => formatAmount(convertCurrency(amount, "EUR", currency), currency);

  const addDamageRow = () =>
    setDamageRows((r) => [...r, { ...EMPTY_DAMAGE, id: String(Date.now()) }]);
  const removeDamageRow = (id: string) =>
    setDamageRows((r) => r.filter((row) => row.id !== id));
  const updateDamageRow = (id: string, patch: Partial<DamageComponent>) =>
    setDamageRows((r) => r.map((row) => (row.id === id ? { ...row, ...patch } : row)));

  const addLossRow = () =>
    setLossRows((r) => [...r, { ...EMPTY_LOSS, id: String(Date.now()) }]);
  const removeLossRow = (id: string) =>
    setLossRows((r) => r.filter((row) => row.id !== id));
  const updateLossRow = (id: string, patch: Partial<LossComponent>) =>
    setLossRows((r) => r.map((row) => (row.id === id ? { ...row, ...patch } : row)));

  const addAdditionalLoss = () =>
    setAdditionalLosses((r) => [...r, { ...EMPTY_ADDITIONAL, id: String(Date.now()) }]);
  const removeAdditionalLoss = (id: string) =>
    setAdditionalLosses((r) => r.filter((row) => row.id !== id));
  const updateAdditionalLoss = (id: string, patch: Partial<AdditionalLoss>) =>
    setAdditionalLosses((r) => r.map((row) => (row.id === id ? { ...row, ...patch } : row)));

  const tabs: { id: Tab; label: string }[] = [
    { id: "damage", label: uk ? "Збитки (D)" : "Damage (D)" },
    { id: "losses", label: uk ? "Втрати (L)" : "Losses (L)" },
    { id: "needs", label: uk ? "Потреби (N)" : "Needs (N)" },
  ];

  const regionOptions = Object.entries(REGIONAL_COEFFICIENTS);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            {uk ? "Калькулятор DaLA" : "DaLA Calculator"}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {uk
              ? "Попередня оцінка збитків за методикою Damage and Loss Assessment (DaLA) Світового банку. Формула: D + L + N = Total"
              : "Preliminary damage estimation using World Bank's Damage and Loss Assessment (DaLA) methodology. Formula: D + L + N = Total"}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl py-8">
        {/* Summary bar */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {uk ? "Підсумок" : "Summary"}
            </h2>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {(["EUR", "USD", "UAH"] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    currency === c ? "bg-white shadow text-gray-900 font-medium" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SummaryCard label={uk ? "Збитки (D)" : "Damage (D)"} value={fmt(result.damage)} color="bg-red-50 text-red-700" />
            <SummaryCard label={uk ? "Втрати (L)" : "Losses (L)"} value={fmt(result.losses)} color="bg-orange-50 text-orange-700" />
            <SummaryCard label={uk ? "Потреби (N)" : "Needs (N)"} value={fmt(result.needs)} color="bg-blue-50 text-blue-700" />
            <SummaryCard label={uk ? "Разом" : "Total"} value={fmt(result.total)} color="bg-emerald-50 text-emerald-700" bold />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-2.5 text-sm rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-white shadow font-medium text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          {activeTab === "damage" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {uk ? "Прямі збитки (Damage)" : "Direct Damage"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    D = &Sigma;(V<sub>i</sub> &times; S<sub>i</sub> &times; K<sub>i</sub> &times; K<sub>r</sub>)
                  </p>
                </div>
                <button onClick={addDamageRow} className="px-3 py-1.5 bg-[#0f172a] text-white text-sm rounded-lg hover:bg-[#1e293b]">
                  + {uk ? "Додати" : "Add"}
                </button>
              </div>

              {/* EMS-98 scale legend */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-500 mb-2">
                  {uk ? "Шкала пошкоджень EMS-98:" : "EMS-98 Damage Scale:"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {EMS98_SCALE.filter((g) => g.grade !== "DS0").map((g) => (
                    <span
                      key={g.grade}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs"
                      style={{ backgroundColor: `${g.color}20`, color: g.color }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: g.color }} />
                      {g.grade} — {uk ? g.nameUk : g.nameEn} (K={g.ki})
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {damageRows.map((row) => (
                  <div key={row.id} className="grid grid-cols-1 md:grid-cols-6 gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="md:col-span-2">
                      <label className="text-xs text-gray-500">{uk ? "Назва об'єкта" : "Object name"}</label>
                      <input
                        type="text"
                        value={row.name}
                        onChange={(e) => updateDamageRow(row.id, { name: e.target.value })}
                        className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                        placeholder={uk ? "Житловий будинок" : "Residential building"}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">V (EUR/{uk ? "м²" : "sqm"})</label>
                      <input
                        type="number"
                        value={row.replacementValue || ""}
                        onChange={(e) => updateDamageRow(row.id, { replacementValue: Number(e.target.value) })}
                        className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                        placeholder="800"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">S ({uk ? "м²" : "sqm"})</label>
                      <input
                        type="number"
                        value={row.area || ""}
                        onChange={(e) => updateDamageRow(row.id, { area: Number(e.target.value) })}
                        className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                        placeholder="120"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">{uk ? "Ступінь (EMS-98)" : "Grade (EMS-98)"}</label>
                      <select
                        value={row.damageGrade}
                        onChange={(e) => updateDamageRow(row.id, { damageGrade: e.target.value as DamageGrade })}
                        className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                      >
                        {EMS98_SCALE.filter((g) => g.grade !== "DS0").map((g) => (
                          <option key={g.grade} value={g.grade}>
                            {g.grade} (K={g.ki})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <label className="text-xs text-gray-500">{uk ? "Область" : "Region"}</label>
                        <select
                          value={row.region}
                          onChange={(e) => updateDamageRow(row.id, { region: e.target.value })}
                          className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                        >
                          {regionOptions.map(([key, val]) => (
                            <option key={key} value={key}>
                              {uk ? val.nameUk : val.nameEn}
                            </option>
                          ))}
                        </select>
                      </div>
                      {damageRows.length > 1 && (
                        <button
                          onClick={() => removeDamageRow(row.id)}
                          className="px-2 py-2 text-red-500 hover:bg-red-50 rounded-lg text-sm"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "losses" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {uk ? "Втрати (Losses)" : "Losses"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    L = &Sigma;(R<sub>i</sub> &times; T<sub>i</sub>) + &Sigma;(D<sub>j</sub>)
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={addLossRow} className="px-3 py-1.5 bg-[#0f172a] text-white text-sm rounded-lg hover:bg-[#1e293b]">
                    + {uk ? "Дохід" : "Revenue"}
                  </button>
                  <button onClick={addAdditionalLoss} className="px-3 py-1.5 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700">
                    + {uk ? "Додаткові витрати" : "Additional costs"}
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-xs font-medium text-gray-500">
                  {uk ? "Втрачені доходи:" : "Lost revenues:"}
                </p>
                {lossRows.map((row) => (
                  <div key={row.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="md:col-span-2">
                      <label className="text-xs text-gray-500">{uk ? "Назва" : "Description"}</label>
                      <input
                        type="text"
                        value={row.name}
                        onChange={(e) => updateLossRow(row.id, { name: e.target.value })}
                        className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                        placeholder={uk ? "Оренда" : "Rental income"}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">R (EUR/{uk ? "міс" : "mo"})</label>
                      <input
                        type="number"
                        value={row.monthlyRevenue || ""}
                        onChange={(e) => updateLossRow(row.id, { monthlyRevenue: Number(e.target.value) })}
                        className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                        placeholder="2000"
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <label className="text-xs text-gray-500">T ({uk ? "місяці" : "months"})</label>
                        <input
                          type="number"
                          value={row.downtimeMonths || ""}
                          onChange={(e) => updateLossRow(row.id, { downtimeMonths: Number(e.target.value) })}
                          className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                          placeholder="12"
                        />
                      </div>
                      {lossRows.length > 1 && (
                        <button
                          onClick={() => removeLossRow(row.id)}
                          className="px-2 py-2 text-red-500 hover:bg-red-50 rounded-lg text-sm"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {additionalLosses.length > 0 && (
                <div className="space-y-4">
                  <p className="text-xs font-medium text-gray-500">
                    {uk ? "Додаткові витрати:" : "Additional costs:"}
                  </p>
                  {additionalLosses.map((row) => (
                    <div key={row.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-orange-50 rounded-lg">
                      <div className="md:col-span-2">
                        <label className="text-xs text-gray-500">{uk ? "Назва" : "Description"}</label>
                        <input
                          type="text"
                          value={row.name}
                          onChange={(e) => updateAdditionalLoss(row.id, { name: e.target.value })}
                          className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                          placeholder={uk ? "Переїзд, оренда тимчасового житла" : "Relocation, temporary housing"}
                        />
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <label className="text-xs text-gray-500">{uk ? "Сума (EUR)" : "Amount (EUR)"}</label>
                          <input
                            type="number"
                            value={row.amount || ""}
                            onChange={(e) => updateAdditionalLoss(row.id, { amount: Number(e.target.value) })}
                            className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                            placeholder="5000"
                          />
                        </div>
                        <button
                          onClick={() => removeAdditionalLoss(row.id)}
                          className="px-2 py-2 text-red-500 hover:bg-red-50 rounded-lg text-sm"
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "needs" && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {uk ? "Потреби відновлення (Needs)" : "Recovery Needs"}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                N = D &times; K<sub>bb</sub> + P + A
              </p>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    {uk ? "Стратегія відновлення (Build Back Better)" : "Recovery Strategy (Build Back Better)"}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {BBB_RATES.map((rate) => (
                      <button
                        key={rate.id}
                        onClick={() => setBbbRate(rate.id)}
                        className={`p-4 rounded-lg border text-left transition-colors ${
                          bbbRate === rate.id
                            ? "border-[#0f172a] bg-[#0f172a]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-sm">{uk ? rate.nameUk : rate.nameEn}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          K<sub>bb</sub> = {rate.multiplier} ({uk ? "множник" : "multiplier"} &times;{rate.multiplier})
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      P — {uk ? "Пріоритетні інвестиції (EUR)" : "Priority investments (EUR)"}
                    </label>
                    <input
                      type="number"
                      value={priorityInvestments || ""}
                      onChange={(e) => setPriorityInvestments(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="0"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      {uk ? "Обладнання, технології, навчання" : "Equipment, technology, training"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      A — {uk ? "Адміністративні витрати (EUR)" : "Administrative costs (EUR)"}
                    </label>
                    <input
                      type="number"
                      value={additionalCosts || ""}
                      onChange={(e) => setAdditionalCosts(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="0"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      {uk ? "Проєктування, нагляд, логістика" : "Design, supervision, logistics"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-xl p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-2">
            {uk ? "Потрібен професійний висновок?" : "Need a professional report?"}
          </h3>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto text-sm">
            {uk
              ? "Цей калькулятор дає попередню оцінку. Для юридично значущого науково-правового висновку за методикою RDNA/DaLA зверніться до наших експертів."
              : "This calculator provides a preliminary estimate. For a legally significant scientific-legal conclusion under RDNA/DaLA methodology, contact our experts."}
          </p>
          <Link
            href={`/${locale}/contacts`}
            className="inline-block px-6 py-3 bg-[#d4a843] hover:bg-[#c49a3a] text-[#0f172a] font-semibold rounded-lg transition-colors"
          >
            {uk ? "Замовити висновок" : "Order a Report"}
          </Link>
        </div>

        {/* Methodology note */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-xs text-blue-800">
          <p className="font-medium mb-1">{uk ? "Методологія:" : "Methodology:"}</p>
          <p>
            {uk
              ? "Калькулятор базується на методиці DaLA Світового банку (RDNA4, лютий 2025), шкалі EMS-98, КМУ №326 та Методиці 3904-1223. Результати є попередніми та не замінюють професійний науково-правовий висновок. Регіональні коефіцієнти Kr відображають відмінності у вартості будівництва між областями."
              : "Calculator is based on the World Bank DaLA methodology (RDNA4, February 2025), EMS-98 scale, CMU Resolution No. 326, and Methodology 3904-1223. Results are preliminary and do not substitute for a professional scientific-legal conclusion. Regional coefficients Kr reflect construction cost differences between oblasts."}
          </p>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  color,
  bold,
}: {
  label: string;
  value: string;
  color: string;
  bold?: boolean;
}) {
  return (
    <div className={`rounded-lg p-4 ${color}`}>
      <div className="text-xs opacity-70">{label}</div>
      <div className={`text-lg mt-1 ${bold ? "font-bold" : "font-semibold"}`}>{value}</div>
    </div>
  );
}
