/**
 * Site-wide language preference for Decision Guide + language loop UI.
 * Full page translation of the main English site is not shipped yet —
 * international buyers go to localized /international/:country pages.
 */

export type SiteLanguageOption = {
  code: string;
  label: string;
  nativeLabel: string;
  /** Localized international buyer page when available */
  href: string;
};

export const SITE_LANGUAGE_STORAGE_KEY = "ak_preferred_language";

/** High-traffic languages shown in the site language loop. */
export const SITE_LANGUAGE_LOOP: SiteLanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English", href: "/international" },
  { code: "zh-CN", label: "Chinese", nativeLabel: "中文", href: "/international/china" },
  { code: "zh-TW", label: "Chinese (Traditional)", nativeLabel: "繁體中文", href: "/international/taiwan" },
  { code: "ja", label: "Japanese", nativeLabel: "日本語", href: "/international/japan" },
  { code: "ko", label: "Korean", nativeLabel: "한국어", href: "/international/korea" },
  { code: "de", label: "German", nativeLabel: "Deutsch", href: "/international/germany" },
  { code: "fr", label: "French", nativeLabel: "Français", href: "/international/france" },
  { code: "es", label: "Spanish", nativeLabel: "Español", href: "/international/spain" },
  { code: "pt-BR", label: "Portuguese", nativeLabel: "Português", href: "/international/brazil" },
  { code: "it", label: "Italian", nativeLabel: "Italiano", href: "/international/italy" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", href: "/international/uae" },
  { code: "ru", label: "Russian", nativeLabel: "Русский", href: "/international/russia" },
  { code: "he", label: "Hebrew", nativeLabel: "עברית", href: "/international/israel" },
  { code: "hi", label: "Hindi / English", nativeLabel: "हिन्दी", href: "/international/india" },
];

export function getStoredPreferredLanguage(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY);
    return value?.trim() || null;
  } catch {
    return null;
  }
}

export function setStoredPreferredLanguage(label: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, label);
    window.dispatchEvent(new CustomEvent("ak-language-preference", { detail: label }));
  } catch {
    // ignore quota / private mode
  }
}

export function resolvePreferredLanguageLabel(codeOrLabel: string): string {
  const match = SITE_LANGUAGE_LOOP.find(
    (item) =>
      item.code.toLowerCase() === codeOrLabel.toLowerCase() ||
      item.label.toLowerCase() === codeOrLabel.toLowerCase() ||
      item.nativeLabel === codeOrLabel,
  );
  return match?.nativeLabel || codeOrLabel;
}

/** Map BCP-47 / browser language tags to a native label for the Decision Guide. */
export function languageFromBrowser(): string | null {
  if (typeof window === "undefined" || !navigator.language) return null;
  const tag = navigator.language.toLowerCase();
  const exact = SITE_LANGUAGE_LOOP.find((item) => item.code.toLowerCase() === tag);
  if (exact) return exact.nativeLabel;
  const prefix = tag.split("-")[0];
  const byPrefix = SITE_LANGUAGE_LOOP.find((item) => item.code.toLowerCase().startsWith(prefix));
  if (byPrefix && byPrefix.code !== "en") return byPrefix.nativeLabel;
  // Common extras not in the loop chips
  if (prefix === "zh") return tag.includes("tw") || tag.includes("hk") ? "繁體中文" : "中文";
  if (prefix === "pt") return "Português";
  if (prefix === "nl") return "Nederlands";
  if (prefix === "sv") return "Svenska";
  if (prefix === "pl") return "Polski";
  if (prefix === "tr") return "Türkçe";
  if (prefix === "uk") return "Українська";
  if (prefix === "vi") return "Tiếng Việt";
  if (prefix === "th") return "ภาษาไทย";
  if (prefix === "id") return "Bahasa Indonesia";
  return null;
}

/** Best language signal for chat: stored preference, then browser. */
export function resolveChatLanguage(): string | null {
  return getStoredPreferredLanguage() || languageFromBrowser();
}
