import React from 'react'

export const materialTheme = {
  primary: '#e91e63',
  primaryLight: '#ff6090',
  primaryDark: '#b0003a',
  secondary: '#ff9800',
  secondaryLight: '#ffc947',
  secondaryDark: '#c66900',
  background: '#212121',
  surface: '#212121',
  onPrimary: '#000000',
  onSecondary: '#000000',
  onBackground: '#878787',
  onSurface: '#ffffff',
  error: '#b00020',
  onError: '#ffffff'
}

const initTheme = {
  data: materialTheme,
  setTheme: () => {}
}

const ThemeContext = React.createContext(initTheme)
export default ThemeContext