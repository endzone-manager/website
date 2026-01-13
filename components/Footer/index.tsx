import { headers } from 'next/headers';
import { detectLanguageFromHeaders, getTranslations } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';

export async function Footer() {
  const headersList = await headers();
  const lang = detectLanguageFromHeaders(headersList);
  const t = getTranslations(lang);
  const currentYear = new Date().getFullYear();

  const copyrightText = lang === 'pt-BR'
    ? `© ${currentYear} Redzone Boss. Todos os direitos reservados.`
    : `© ${currentYear} Redzone Boss. All rights reserved.`;

  return (
    <footer className="w-full border-t mt-auto py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>{copyrightText}</p>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="hover:underline hover:text-foreground transition-colors"
            >
              {SITE_CONFIG.email}
            </a>
            <span className="hidden md:inline">•</span>
            <a
              href={SITE_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-foreground transition-colors"
            >
              {t.instagram}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
