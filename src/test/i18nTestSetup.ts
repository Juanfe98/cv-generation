/**
 * i18n test setup
 *
 * Imports the production i18n config to ensure tests use the same translations.
 * Sets language to English for deterministic test behavior.
 */
import i18n from '../core/i18n/config'

i18n.changeLanguage('en')
