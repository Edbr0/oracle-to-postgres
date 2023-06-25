import type { GlobalTheme, GlobalThemeOverrides } from 'naive-ui'
import { isDark } from '../composables'

const vars: Partial<GlobalTheme['common']> = {
  fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif !important",
  primaryColor: '#2681ff',
  primaryColorHover: '#409fff',
  primaryColorPressed: '#2681ff',

  errorColor: '#f15532',
  warningColor: '#f27a24',
  infoColor: '#90a0ae',
  successColor: '#50e3c2',

  textColor1: '#bcc9d4',

  borderColor: '#3a4659',
  borderRadius: '0',
  borderRadiusSmall: '0'
}

const vars2 = {
  darkColor: '#262c33',
  guiPrimaryColor: '#2483ff',
  guiComponentBgColor: '#262c33',
  guiComponentBgColorDark: '#262c32',
  guiComponentBgColorHover: '#303640',
  guiComponentBgColorActive: '#262b33',
  guiComponentBgColorDisabled: '#13161a',
  guiFontColor: '#a1aeb3',
  borderColor: '#0b0c0d',
  border: '1px solid #0b0c0d',
  borderPrimary: '1px solid #2681ff',
  guiBgColorDark: '#111417',
  bgColor1: '#0b0c0d',
  bgColor2: '#1d262e',
}

export const colors = {
  primaryColor: '#4FB233',
  primaryColorHover: '#4FB233',
  primaryColorPressed: '#4FB233',
  infoColor: '#335FFF',
  infoColorHover: '#335FFF',
  infoColorPressed: '#335FFF',
  successColor: '#4FB233',
  successColorHover: '#4FB233',
  successColorPressed: '#4FB233',
  errorColor: '#D92149',
  errorColorHover: '#D92149',
  errorColorPressed: '#D92149',
  warningColor: '#FFAC26',
  warningColorHover: '#fccb37',
  warningColorPressed: '#FFAC26',
  textColorDisabled: '#D7DAE0',
  textColor1: '#333',
  textColor2: '#333',
  bgYellow: '#EAB308',
  bgColorInput: '#E5E7EB',
  bgColorDefault: '#FFFFFF'
}

const themeOverrides: GlobalThemeOverrides = {
  common: {
    ...vars,
  },
  Checkbox: {
    sizeMedium: '14px',
    fontSizeMedium: '12px',
    textColor: isDark.value ? '#C2C3BC' : colors.textColor1,
    color: '#0000',
    colorChecked: '#0000',
    border: `2px solid ${colors.bgYellow}`,
    borderFocus: `2px solid ${colors.bgYellow}`,
    borderRadius: '4px',
    colorTableHeaderPopover: colors.bgYellow,
    checkMarkColor: colors.bgYellow,
    boxShadowFocus: 'none',
  },
  Input: {
    heightMedium: '32px',
    fontSizeMedium: '16px',
    paddingMedium: '0 12px',
    iconSize: '24px',
    border: `1px solid ${colors.textColorDisabled}`,
    borderHover: `1px solid ${colors.bgColorInput}`,
    borderFocus: `1px solid ${colors.warningColor}`,
    borderFocusError: `1px solid ${colors.errorColor}`,
    color: isDark.value ? 'bg-gray-400' : colors.bgColorInput,
    colorDisabled: isDark.value ? 'bg-gray-400' : colors.bgColorInput,
    placeholderColor: isDark.value ? '#4b5563' : vars2.guiFontColor,
    colorFocus: isDark.value ? 'bg-gray-400' : colors.bgColorInput,
    textColor: isDark.value ? '#C2C3BC' : colors.textColor1,
    textColorDisabled: isDark.value ? '#818cab' : colors.textColor1,
    placeholderColorDisabled: isDark.value ? '#818cab' : colors.textColor1
  },
  Select: {
    peers: {
      InternalSelection: {
        fontSizeSmall: '12px',
        textColor: '#fff',
        arrowColor: vars2.guiBgColorDark,
        caretColor: vars.primaryColor,
        color: colors.bgYellow,
        colorActive: colors.bgYellow,
        colorDisabled: colors.primaryColor,
        border: colors.warningColor,
        borderHover: colors.warningColor,
        borderActive: colors.warningColor,
        borderFocus: colors.warningColor,
        boxShadowFocus: 'none',
        boxShadowActive: 'none',
        paddingSingle: '0 24px 0 8px',
        placeholderColor: '#333',
        heightMedium: '32px',
      },
      InternalSelectMenu: {
        optionFontSizeSmall: '12px',
        optionFontSizeMedium: '12px',
        color: colors.bgYellow,
        optionColorActive: colors.warningColorHover,
        optionColorPending: colors.warningColorHover,
        optionTextColor: '#fff',
        optionTextColorActive: colors.warningColorHover,
        optionHeightSmall: '28px',
        optionHeightMedium: '28px',
      },
    },
  },
  Dropdown: {
    color: isDark.value ? '#48484E' : colors.bgColorDefault,
    optionTextColor: isDark.value ? '#E1E1D1' : colors.textColor1
  },
  Radio: {
    fontSizeSmall: '12px',
    buttonHeightSmall: '24px',
    buttonTextColor: vars2.guiFontColor,
    buttonTextColorActive: '#fff',
    buttonColor: vars2.darkColor,
    buttonColorActive: vars2.guiPrimaryColor,
    buttonBoxShadow: 'none',
    buttonBoxShadowFocus: 'none',
    buttonBoxShadowHover: 'none',
    buttonBorderColor: vars2.borderColor,
    buttonBorderColorActive: 'var(--box-shadow-active)',
    color: '#0000',
    textColor: isDark.value ? '#E1E1D1' : vars.textColor1,
    boxShadowFocus: 'var(--box-shadow-active)',
  }
}

export {
  themeOverrides,
}
