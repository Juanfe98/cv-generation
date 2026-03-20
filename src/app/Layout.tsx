import { Link, NavLink, Outlet } from 'react-router-dom'

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2">
      {/* Icon mark - document with spark accent */}
      <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-sm transition-transform group-hover:scale-105">
        <svg
          className="h-4 w-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        {/* Spark accent */}
        <div className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber-400" />
      </div>
      <span className="text-lg font-semibold tracking-tight text-slate-900">
        CV Generator
      </span>
    </Link>
  )
}

function EditorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  )
}

function PreviewIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200/80 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo />
          <nav className="flex items-center gap-1">
            <NavLink
              to="/editor"
              className={({ isActive }) =>
                `relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded ${
                      isActive ? 'text-blue-600' : ''
                    }`}
                  >
                    <EditorIcon className="h-4 w-4" />
                  </span>
                  <span>Editor</span>
                </>
              )}
            </NavLink>
            <NavLink
              to="/preview"
              className={({ isActive }) =>
                `relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded ${
                      isActive ? 'text-blue-600' : ''
                    }`}
                  >
                    <PreviewIcon className="h-4 w-4" />
                  </span>
                  <span>Preview</span>
                </>
              )}
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="relative flex-1 overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100">
        {/* Premium background treatment */}
        <div className="pointer-events-none absolute inset-0">
          {/* Subtle blue glow orb - brand motif */}
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-100 opacity-30 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-50 opacity-40 blur-3xl" />
          {/* Subtle radial gradient for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent" />
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        {/* Content with refined spacing */}
        <div className="relative h-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
