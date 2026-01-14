import { headers } from 'next/headers';
import Image from 'next/image';
import { SignupForm } from '@/components/SignupForm';
import { SITE_CONFIG } from '@/lib/constants';
import { detectLanguageFromHeaders, getTranslations, type Language } from '@/lib/i18n';
import { WrapperLink } from '../WrapperLink';

interface LandingHeroProps {
  lang?: Language;
}

export async function LandingHero({ lang }: LandingHeroProps = {}) {
  // If lang is not provided, detect it from headers
  let detectedLang = lang;
  if (!detectedLang) {
    const headersList = await headers();
    detectedLang = detectLanguageFromHeaders(headersList);
  }
  const t = getTranslations(detectedLang);

  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.subtitle}</h2>
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
        {t.description}
      </p>

      <div className="mb-20">
        <SignupForm lang={detectedLang} />
      </div>

      {/* Game Preview Section */}
      <div className="max-w-6xl mx-auto mb-20">
        <h3 className="text-3xl font-bold mb-4">{t.gamePreview}</h3>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">{t.gamePreviewText}</p>
        <div className="relative w-full rounded-xl overflow-hidden border-2 border-border shadow-2xl bg-card">
          <Image
            src="/game-preview.jpg"
            alt={
              detectedLang === 'pt-BR'
                ? 'Preview do jogo Redzone Boss mostrando interface com resultados de jogos da NFL'
                : 'Redzone Boss game preview showing NFL game results interface'
            }
            width={1200}
            height={800}
            className="w-full h-auto object-contain"
            priority
            quality={90}
          />
        </div>
        <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
          <p className="text-xs text-muted-foreground text-center">
            <span className="font-semibold">*</span>{' '}
            {detectedLang === 'pt-BR'
              ? 'Imagem meramente ilustrativa - Interface inspirada pelo Brasfoot/Elifoo, criada pela National Curiosity League'
              : 'Illustrative image only - Interface inspired by Brasfoot/Elifoot, created by National Curiosity League'}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="text-xl font-semibold mb-3">{t.vision}</h3>
          <p className="text-muted-foreground mb-3">{t.visionText}</p>
          <p className="text-muted-foreground">{t.goal}</p>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <h3 className="text-xl font-semibold mb-3">{t.joinUs}</h3>
          <p className="text-muted-foreground mb-4">{t.joinUsText}</p>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">
              {detectedLang === 'pt-BR' ? 'Entre em contato:' : 'Get in touch:'}
            </p>
            <WrapperLink
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-red-600 dark:text-red-400 hover:underline font-medium"
            >
              {SITE_CONFIG.email}
            </WrapperLink>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-8">{t.features}</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border bg-card">
            <h4 className="text-lg font-semibold mb-3">{t.feature1Title}</h4>
            <p className="text-sm text-muted-foreground">{t.feature1Desc}</p>
          </div>

          <div className="p-6 rounded-lg border bg-card">
            <h4 className="text-lg font-semibold mb-3">{t.feature2Title}</h4>
            <p className="text-sm text-muted-foreground">{t.feature2Desc}</p>
          </div>

          <div className="p-6 rounded-lg border bg-card">
            <h4 className="text-lg font-semibold mb-3">{t.feature3Title}</h4>
            <p className="text-sm text-muted-foreground">{t.feature3Desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
