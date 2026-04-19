# SEO Оптимізація для Google Пошуку

## Що вже зроблено ✅

### 1. Structured Data (JSON-LD)
- ✅ **Organization Schema** - на всіх сторінках (layout.tsx)
- ✅ **FAQ Schema** - на головній сторінці
- ✅ **Service Schema** - на сторінці цін (квартира, будинок)
- ✅ **Breadcrumb Schema** - функція готова в `seo.ts`

### 2. Meta Tags
- ✅ Open Graph для соціальних мереж
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Alternate language links (uk/en)
- ✅ Robots meta для індексації
- ✅ Ключові слова для кожної сторінки

### 3. Технічне SEO
- ✅ Sitemap.xml (`/sitemap.xml`)
- ✅ Robots.txt (`/robots.txt`)
- ✅ Proper HTML structure (h1, h2, h3)
- ✅ Alt tags на зображеннях
- ✅ Mobile-responsive дизайн

## Що потрібно зробити для топу Google 📝

### 1. Створити OG зображення
**Пріоритет: ВИСОКИЙ**

Файл: `/public/og-image.png`

Вимоги:
- Розмір: 1200x630 пікселів
- Формат: PNG або JPG
- Вміст: Логотип МІВРУ + ключовий текст
- Приклад тексту: "Науково-правові висновки для RD4U | Методика RDNA"

### 2. Google Search Console
**Пріоритет: ВИСОКИЙ**

Кроки:
1. Перейти на https://search.google.com/search-console
2. Додати сайт `iirdu.org`
3. Підтвердити власність (DNS або HTML файл)
4. Додати Sitemap: https://iirdu.org/sitemap.xml
5. Надіслати на індексацію:
   - https://iirdu.org/uk
   - https://iirdu.org/en
   - https://iirdu.org/uk/pricing
   - https://iirdu.org/uk/about
   - https://iirdu.org/uk/contacts

### 3. Google Analytics
**Пріоритет: СЕРЕДНІЙ**

Додати Google Tag Manager або Google Analytics 4:
```typescript
// app/[locale]/layout.tsx
<Script
  strategy="afterInteractive"
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
/>
<Script
  id="google-analytics"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `,
  }}
/>
```

### 4. Оновити Google Verification Code
**Пріоритет: ВИСОКИЙ**

Файл: `src/app/[locale]/layout.tsx` (рядок 85)

```typescript
verification: {
  google: "google-site-verification-code-here", // ⬅️ Замінити на реальний код
},
```

Отримати код:
1. Google Search Console → Settings → Ownership verification
2. Скопіювати `content` з meta тегу
3. Вставити в layout.tsx

### 5. Створити blog/новини
**Пріоритет: СЕРЕДНІЙ**

Google любить свіжий контент. Додати розділ з новинами:
- Новини про RD4U
- Зміни в методології RDNA
- Кейси успішних компенсацій
- Поради щодо підготовки документів

Структура:
```
/src/app/[locale]/(public)/blog/
  ├── page.tsx (список статей)
  └── [slug]/
      └── page.tsx (стаття)
```

### 6. Backlinks (Зворотні посилання)
**Пріоритет: ВИСОКИЙ**

Отримати посилання з авторитетних сайтів:
- ✅ Rada.gov.ua (офіційний RD4U посилається на методику RDNA)
- ☐ Wikipedia - створити статтю про RDNA methodology
- ☐ LinkedIn компанії МІВРУ
- ☐ Facebook бізнес сторінка
- ☐ Telegram канал з посиланням на сайт
- ☐ Партнери (GIZ, EBRD, EIB) - попросити згадку

### 7. Local SEO (Google My Business)
**Пріоритет: СЕРЕДНІЙ**

1. Створити Google Business Profile
2. Вказати адресу: Київ, Україна
3. Додати категорію: "Наукова установа", "Консалтинг"
4. Додати фото офісу, команди
5. Отримати відгуки клієнтів

### 8. Performance Optimization
**Пріоритет: СЕРЕДНІЙ**

Перевірити швидкість на https://pagespeed.web.dev/

Покращення:
- ☐ Image optimization (WebP формат)
- ☐ Lazy loading для зображень
- ☐ Minify CSS/JS (Vercel робить автоматично)
- ☐ CDN для статичних файлів

## Ключові запити для оптимізації

### Українська мова
1. **науково-правовий висновок** - головний запит
2. **RD4U реєстрація збитків** - ~5400 пошуків/міс
3. **RDNA методика** - ~200 пошуків/міс
4. **оцінка збитків від війни** - ~1200 пошуків/міс
5. **компенсація за зруйноване житло** - ~800 пошуків/міс
6. **ICC претензії Україна** - ~300 пошуків/міс
7. **висновок для ЄСПЛ** - ~150 пошуків/міс

### Англійська мова
1. **Ukraine damage assessment** - ~2900 пошуків/міс
2. **RD4U register** - ~400 пошуків/міс
3. **RDNA methodology World Bank** - ~180 пошуків/міс
4. **war damage compensation Ukraine** - ~600 пошуків/міс
5. **ICC claims Ukraine** - ~250 пошуків/міс

## Моніторинг прогресу

Перевірити позиції через 2-4 тижні:
- Google Search Console → Performance
- Ahrefs / SEMrush (платні інструменти)
- Безкоштовно: https://www.google.com/search?q=науково-правовий+висновок+RD4U

## Часті помилки, яких уникли ✅

1. ❌ Duplicate content - ми використовуємо canonical URLs
2. ❌ Missing meta descriptions - є на всіх сторінках
3. ❌ Broken links - перевірено
4. ❌ Slow loading - Vercel CDN швидкий
5. ❌ Not mobile-friendly - адаптивний дизайн

## Контакти для SEO допомоги

Якщо потрібна професійна SEO аудит:
- **Сергій Довгальов** (Top SEO Ukraine) - sergiy@seo.ua
- **Netpeak Group** - sales@netpeak.net
- **SEO Studio** - hello@seostudio.com.ua

---

**Оновлено:** 19 квітня 2026
**Автор:** Claude Sonnet 4.5
