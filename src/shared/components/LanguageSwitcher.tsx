import { useTranslation } from 'react-i18next'
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { useState, useRef, useEffect } from 'react'
import {
  SUPPORTED_LANGUAGES,
  LANGUAGE_NAMES,
  I18N_STORAGE_KEY,
  type SupportedLanguage,
} from '../../core/i18n/constants'

interface LanguageSwitcherProps {
  variant?: 'default' | 'compact'
}

export function LanguageSwitcher({ variant = 'default' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = i18n.language as SupportedLanguage

  const handleLanguageChange = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang)
    localStorage.setItem(I18N_STORAGE_KEY, lang)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  if (variant === 'compact') {
    return (
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label={`Language: ${LANGUAGE_NAMES[currentLanguage]}`}
        >
          <GlobeAltIcon className="h-5 w-5" />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full z-50 mt-1 min-w-[120px] rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => handleLanguageChange(lang)}
                className={`flex w-full items-center px-3 py-2 text-sm ${
                  lang === currentLanguage
                    ? 'bg-blue-50 font-medium text-blue-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {LANGUAGE_NAMES[lang]}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <GlobeAltIcon className="h-4 w-4 text-slate-500" />
        <span>{LANGUAGE_NAMES[currentLanguage]}</span>
        <ChevronDownIcon
          className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => handleLanguageChange(lang)}
              className={`flex w-full items-center px-3 py-2 text-sm ${
                lang === currentLanguage
                  ? 'bg-blue-50 font-medium text-blue-600'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {LANGUAGE_NAMES[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
