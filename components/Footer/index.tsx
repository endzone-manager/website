import { headers } from 'next/headers';
import { detectLanguageFromHeaders } from '@/lib/i18n';

export async function Footer() {
  const headersList = await headers();
  const lang = detectLanguageFromHeaders(headersList);
  const currentYear = new Date().getFullYear();

  const copyrightText = lang === 'pt-BR'
    ? `© ${currentYear} Redzone Boss. Todos os direitos reservados.`
    : `© ${currentYear} Redzone Boss. All rights reserved.`;

  return (
    <footer className="w-full border-t mt-auto py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>{copyrightText}</p>
      </div>
    </footer>
  );
}
