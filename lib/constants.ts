// Site constants - Update these values to keep SEO and contact info synchronized
export const SITE_CONFIG = {
  name: 'Redzone Boss',
  email: 'redzonebossgame@gmail.com',
  instagram: 'https://www.instagram.com/redzoneboss.game/',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://redzonebossgame.com',
  description: {
    'pt-BR':
      'Redzone Boss é uma simulação profunda de gestão de futebol americano construída para o estrategista moderno. Conecta a administração de alto nível da franquia com a execução tática em tempo real.',
    'en-US':
      'Redzone Boss is a deep-dive American Football management simulation built for the modern strategist. It bridges the gap between high-level franchise administration and real-time tactical execution.',
  },
} as const;
