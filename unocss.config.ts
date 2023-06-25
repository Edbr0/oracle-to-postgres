import { defineConfig, presetAttributify, presetUno, presetWebFonts, presetIcons } from 'unocss'

export default defineConfig({
  shortcuts: {
    'border-base': 'border-gray-200',
    'bg-base': 'bg-white dark:bg-dark-100',
    'color-base': 'text-gray-900',
    'color-fade': 'text-gray-900:50',
    'icon-button': 'op50 hover:op100 my-auto',
    'default-width': 'w-full h-100vh p-6 bg-gray-200'
  },
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
    presetWebFonts({
      fonts: {
        sans: 'Inter',
        mono: 'DM Mono',
      },
    }),
  ],
  theme: {
    colors: {
      primary: 'var(--theme-color)',
      dark: {
        100: '#222',
        200: '#3A3E41',
        300: '#181A1B',
        400: '#26292B',
        500: '#666',
        600: '#777',
        700: '#888',
        800: '#999',
        900: '#aaa',
      },
    },
  },
  rules: [
    [/^m-(\d+)$/, ([, d]: any | number| bigint) => ({ margin: `${d / 4}rem` })],
    [/^p-(\d+)$/, (match: any | number| bigint) => ({ padding: `${match[1] / 4}rem` })],
    [/^w-(\d+)$/, (match: any | number| bigint) => ({ width: `${match[1] * 4}rem` })]
  ]
})
