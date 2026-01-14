import { headers } from 'next/headers';
import { detectLanguageFromHeaders, type Language } from './i18n';

// This function detects the language once and can be reused
// This avoids multiple headers() calls across components
export async function getLanguageFromHeaders(): Promise<Language> {
  const headersList = await headers();
  return detectLanguageFromHeaders(headersList);
}
