import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			navy: {
  				'50': '#eef2ff',
  				'100': '#dde5ff',
  				'200': '#c3cfff',
  				'300': '#99a8ff',
  				'400': '#6b7bff',
  				'500': '#3d4dff',
  				'600': '#2c5282',
  				'700': '#1a365d',
  				'800': '#0f2444',
  				'900': '#0A1F44',
  				'950': '#060e1f'
  			},
  			gold: {
  				'50': '#fefce8',
  				'100': '#fef9c3',
  				'200': '#fef08a',
  				'300': '#fde047',
  				'400': '#E5C158',
  				'500': '#D4AF37',
  				'600': '#B8860B',
  				'700': '#92660a',
  				'800': '#784f0d',
  				'900': '#654210'
  			},
  			// Accessible gold color with better contrast on white (WCAG AA)
  			'gold-accessible': '#B8860B',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			serif: [
  				'Playfair Display',
  				'Georgia',
  				'serif'
  			],
  			sans: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			// Standardized border radius values
  			'card': '1rem',  // 16px
  			'button': '0.75rem',  // 12px
  			'input': '0.75rem'  // 12px
  		},
  		keyframes: {
  			'fade-in-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(30px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'fade-in': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '-1000px 0'
  				},
  				'100%': {
  					backgroundPosition: '1000px 0'
  				}
  			},
  			'slide-in-right': {
  				'0%': {
  					transform: 'translateX(20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			'pulse-gold': {
  				'0%, 100%': {
  					boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.4)'
  				},
  				'50%': {
  					boxShadow: '0 0 0 15px rgba(212, 175, 55, 0)'
  				}
  			},
  			'pulse-subtle': {
  				'0%, 100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				},
  				'50%': {
  					opacity: '0.9',
  					transform: 'scale(1.02)'
  				}
  			},
  			'bounce-subtle': {
  				'0%, 100%': {
  					transform: 'translateY(0)',
  					animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
  				},
  				'50%': {
  					transform: 'translateY(-8px)',
  					animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'fade-in-up': 'fade-in-up 0.6s ease-out',
  			'fade-in': 'fade-in 0.4s ease-out',
  			shimmer: 'shimmer 3s infinite',
  			'slide-in-right': 'slide-in-right 0.5s ease-out',
  			float: 'float 6s ease-in-out infinite',
  			'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
  			'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
  			'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		backgroundImage: {
  			'grid-gold': 'linear-gradient(to right, rgba(212,175,55,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.08) 1px, transparent 1px)',
  			'dot-gold': 'radial-gradient(circle, rgba(212,175,55,0.2) 1px, transparent 1px)',
  			'gradient-navy': 'linear-gradient(135deg, #0A1F44 0%, #1a365d 50%, #2c5282 100%)',
  			'gradient-radial-gold': 'radial-gradient(circle at 30% 20%, rgba(212,175,55,0.15) 0%, rgba(10,31,68,1) 60%)'
  		},
  		backgroundSize: {
  			'grid-64': '64px 64px',
  			'dot-32': '32px 32px'
  		},
  		boxShadow: {
  			premium: '0 4px 6px -1px rgba(10,31,68,0.1), 0 2px 4px -1px rgba(10,31,68,0.06), 0 0 0 1px rgba(212,175,55,0.05)',
  			'gold-glow': '0 10px 25px -5px rgba(212,175,55,0.3), 0 8px 10px -6px rgba(212,175,55,0.2)',
  			'navy-xl': '0 25px 50px -12px rgba(10,31,68,0.25)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
