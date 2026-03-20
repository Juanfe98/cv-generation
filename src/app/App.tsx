import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { CvProvider, useCv } from './providers'
import { ThemeProvider } from '../core/theme'
import '../core/i18n/config'

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { cv } = useCv()
  return (
    <ThemeProvider
      accentColor={cv.settings.accentColor}
      spacingPreset={cv.settings.spacingPreset}
    >
      {children}
    </ThemeProvider>
  )
}

function App() {
  return (
    <CvProvider>
      <ThemeWrapper>
        <RouterProvider router={router} />
      </ThemeWrapper>
    </CvProvider>
  )
}

export default App
