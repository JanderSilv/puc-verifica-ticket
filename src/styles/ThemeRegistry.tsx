'use client'
import * as React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { EmotionCacheProvider } from './EmotionCache'
import { makeTheme } from './theme'

function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <EmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={makeTheme()}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </EmotionCacheProvider>
  )
}

export { ThemeRegistry }
