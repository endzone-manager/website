// Simple i18n system with automatic language detection
export type Language = 'pt-BR' | 'en-US';

export const translations = {
  'pt-BR': {
    title: 'Redzone Boss',
    subtitle: 'O Simulador de Estratégia do Gridiron',
    description:
      'Redzone Boss é uma simulação profunda de gestão de futebol americano construída para o estrategista moderno. Conecta a administração de alto nível da franquia com a execução tática em tempo real.',
    vision: 'A Visão',
    visionText:
      'O projeto nasceu do desejo de uma experiência no estilo "Manager" especificamente para futebol americano—inspirado na simplicidade viciante e profundidade de clássicos como Brasfoot ou Elifoot, mas evoluído para a complexidade do gridiron.',
    goal: 'Nosso objetivo é fornecer uma simulação onde lógica, estatísticas e intuição tática superam reflexos "arcade".',
    features: 'Recursos Principais',
    feature1Title: 'Chamadas de Jogadas em Tempo Real',
    feature1Desc:
      'Ao contrário de simuladores estáticos, Redzone Boss coloca você na linha lateral. Chame jogadas ofensivas e defensivas em tempo real, reaja às tendências do oponente e gerencie o relógio e timeouts durante drives de alta pressão.',
    feature2Title: 'Arquitetura de Franquia',
    feature2Desc:
      'Assuma o comando como Gerente Geral: construção de elenco, scouting dinâmico e progressão de jogadores.',
    feature3Title: 'Experiência Completa',
    feature3Desc:
      'Redzone Boss oferece uma interface elegante e sem distrações, processamento rápido de simulação e uma experiência rica em dados que os gestores procuram.',
    joinUs: 'Junte-se ao Front Office',
    joinUsText:
      'Redzone Boss é um projeto construído para a comunidade. Seja você um nerd de dados, um fanático por futebol ou um desenvolvedor, damos as boas-vindas ao seu feedback.',
    signUp: 'Cadastre-se',
    signUpText: 'Cadastre-se para receber atualizações sobre o desenvolvimento do projeto',
    instagram: 'Instagram',
    contact: 'Contato',
    contactEmail: 'redzonebossgame@gmail.com',
    comingSoon: 'Em breve',
    copyright: 'Todos os direitos reservados.',
    gamePreview: 'Preview do Jogo',
    gamePreviewText:
      'Veja como será a experiência do Redzone Boss. Uma interface rica em dados com resultados em tempo real, estatísticas detalhadas e gestão completa de franquia.',
  },
  'en-US': {
    title: 'Redzone Boss',
    subtitle: 'The Gridiron Strategy Simulator',
    description:
      'Redzone Boss is a deep-dive American Football management simulation built for the modern strategist. It bridges the gap between high-level franchise administration and real-time tactical execution.',
    vision: 'The Vision',
    visionText:
      'The project was born out of a desire for a "Manager-style" experience specifically for American Football—inspired by the addictive simplicity and depth of classics like Brasfoot or Elifoot, but evolved for the complexity of the gridiron.',
    goal: 'Our goal is to provide a simulation where logic, statistics, and tactical intuition outweigh "arcade" reflexes.',
    features: 'Core Features',
    feature1Title: 'Real-Time Play Calling',
    feature1Desc:
      "Unlike static simulators, Redzone Boss puts you on the sidelines. Call offensive and defensive plays in real-time, react to your opponent's tendencies, and manage the clock and timeouts during high-stakes drives.",
    feature2Title: 'Franchise Architecture',
    feature2Desc:
      'Take the helm as the General Manager: roster construction, dynamic scouting, and player progression.',
    feature3Title: 'Complete Experience',
    feature3Desc:
      'Redzone Boss offers a sleek, distraction-free UI, fast simulation processing, and a data-rich experience that managers crave.',
    joinUs: 'Join the Front Office',
    joinUsText:
      'Redzone Boss is a project built for the community. Whether you are a data nerd, a football fanatic, or a developer, we welcome your feedback.',
    signUp: 'Sign Up',
    signUpText: 'Sign up to receive updates on the project development',
    instagram: 'Instagram',
    contact: 'Contact',
    contactEmail: 'redzonebossgame@gmail.com',
    comingSoon: 'Coming Soon',
    copyright: 'All rights reserved.',
    gamePreview: 'Game Preview',
    gamePreviewText:
      'See what the Redzone Boss experience will be like. A data-rich interface with real-time results, detailed statistics, and complete franchise management.',
  },
};

// Server-side language detection from headers
export function detectLanguageFromHeaders(headers: Headers): Language {
  const acceptLanguage = headers.get('accept-language') || '';

  // Check if browser language starts with 'pt'
  if (acceptLanguage.toLowerCase().startsWith('pt')) {
    return 'pt-BR';
  }

  // Default to English
  return 'en-US';
}

// Client-side language detection (fallback)
export function detectLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'en-US'; // Default for SSR
  }

  const browserLang =
    navigator.language || (navigator as Navigator & { userLanguage?: string }).userLanguage;

  // Check if browser language starts with 'pt'
  if (browserLang?.toLowerCase().startsWith('pt')) {
    return 'pt-BR';
  }

  // Default to English
  return 'en-US';
}

export function getTranslations(lang: Language) {
  return translations[lang];
}
