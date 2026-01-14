import { headers } from 'next/headers';
import { SITE_CONFIG } from '@/lib/constants';
import { detectLanguageFromHeaders, getTranslations, type Language } from '@/lib/i18n';
import { WrapperLink } from '../WrapperLink';

interface FooterProps {
  lang?: Language;
}

export async function Footer({ lang }: FooterProps = {}) {
  // If lang is not provided, detect it from headers
  let detectedLang = lang;
  if (!detectedLang) {
    const headersList = await headers();
    detectedLang = detectLanguageFromHeaders(headersList);
  }
  const t = getTranslations(detectedLang);
  const currentYear = new Date().getFullYear();

  const copyrightText =
    detectedLang === 'pt-BR'
      ? `© ${currentYear} ${SITE_CONFIG.name}. Todos os direitos reservados.`
      : `© ${currentYear} ${SITE_CONFIG.name}. All rights reserved.`;

  return (
    <footer className="w-full border-t mt-auto py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>{copyrightText}</p>
          <div className="flex items-center gap-4">
            <WrapperLink
              href={`mailto:${SITE_CONFIG.email}`}
              className="hover:underline hover:text-foreground transition-colors"
            >
              {SITE_CONFIG.email}
            </WrapperLink>
            <span className="hidden md:inline">•</span>
            <WrapperLink href={SITE_CONFIG.instagram}>{t.instagram}</WrapperLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
