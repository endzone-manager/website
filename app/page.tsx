import { cache, Suspense } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LandingHero } from '@/components/LandingHero';
import { FooterSkeleton } from '@/components/Skeletons/FooterSkeleton';
import { HeaderSkeleton } from '@/components/Skeletons/HeaderSkeleton';
import { LandingHeroSkeleton } from '@/components/Skeletons/LandingHeroSkeleton';
import { getLanguageFromHeaders } from '@/lib/i18n-context';

// Cache language detection to avoid multiple calls
// Note: Using headers() automatically makes this route dynamic with cacheComponents enabled
const getCachedLanguage = cache(getLanguageFromHeaders);

// Wrapper components that get the language and pass it as prop
async function HeaderWithLang() {
  const lang = await getCachedLanguage();
  return <Header lang={lang} />;
}

async function LandingHeroWithLang() {
  const lang = await getCachedLanguage();
  return <LandingHero lang={lang} />;
}

async function FooterWithLang() {
  const lang = await getCachedLanguage();
  return <Footer lang={lang} />;
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Suspense fallback={<HeaderSkeleton />}>
        <HeaderWithLang />
      </Suspense>
      <Suspense fallback={<LandingHeroSkeleton />}>
        <LandingHeroWithLang />
      </Suspense>
      <Suspense fallback={<FooterSkeleton />}>
        <FooterWithLang />
      </Suspense>
    </main>
  );
}
