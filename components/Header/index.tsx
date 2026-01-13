import { headers } from 'next/headers';
import { detectLanguageFromHeaders, getTranslations } from '@/lib/i18n';
import { Logo } from '@/components/Logo';

export async function Header() {
  const headersList = await headers();
  const lang = detectLanguageFromHeaders(headersList);
  const t = getTranslations(lang);

  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Logo />
          <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
            {t.title}
          </h1>
        </div>
        <nav className="flex items-center gap-4">
          <a
            href="https://instagram.com/redzoneboss"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:underline text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.instagram}
          </a>
        </nav>
      </div>
    </header>
  );
}
