import { NavLink, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../shared/components'

export function Layout() {
  const { t } = useTranslation('editor')

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-xl font-bold text-slate-900">CV Generator</h1>
          <nav className="flex items-center gap-4">
            <NavLink
              to="/editor"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              {t('mobileToggle.editor')}
            </NavLink>
            <NavLink
              to="/preview"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              {t('mobileToggle.preview')}
            </NavLink>
            <LanguageSwitcher variant="compact" />
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
