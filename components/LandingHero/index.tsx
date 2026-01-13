import { headers } from 'next/headers';
import { detectLanguageFromHeaders, getTranslations } from '@/lib/i18n';
import { SignupForm } from '@/components/SignupForm';

export async function LandingHero() {
  const headersList = await headers();
  const lang = detectLanguageFromHeaders(headersList);
  const t = getTranslations(lang);

  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.subtitle}</h2>
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
        {t.description}
      </p>

      <div className="mb-20">
        <SignupForm lang={lang} />
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="text-xl font-semibold mb-3">{t.vision}</h3>
          <p className="text-muted-foreground mb-3">{t.visionText}</p>
          <p className="text-muted-foreground">{t.goal}</p>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <h3 className="text-xl font-semibold mb-3">{t.joinUs}</h3>
          <p className="text-muted-foreground">{t.joinUsText}</p>
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
