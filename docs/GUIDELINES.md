# Development Guidelines

Este documento descreve as diretrizes e padrões de desenvolvimento para o projeto Redzone Boss Website.

## 📁 Estrutura de Componentes

### Padrão de Organização

Todos os componentes devem seguir o padrão de **pasta com `index.tsx`**:

```
components/
  ComponentName/
    index.tsx
```

### Exemplo

```typescript
// ❌ NÃO FAÇA ISSO
components/
  header.tsx
  footer.tsx
  signup-form.tsx

// ✅ FAÇA ASSIM
components/
  Header/
    index.tsx
  Footer/
    index.tsx
  SignupForm/
    index.tsx
```

### Importação

Ao importar componentes, use o caminho da pasta (sem `/index.tsx`):

```typescript
// ✅ Correto
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SignupForm } from '@/components/SignupForm';

// ❌ Incorreto
import { Header } from '@/components/Header/index';
import { Header } from '@/components/header';
```

## 🎯 Convenções de Nomenclatura

### Componentes

- **PascalCase** para nomes de componentes
- **PascalCase** para nomes de pastas de componentes
- Use nomes descritivos e específicos

```typescript
// ✅ Correto
components/
  Header/
  Footer/
  LandingHero/
  SignupForm/

// ❌ Incorreto
components/
  header/
  footer/
  landing-hero/
  signup-form/
```

### Arquivos

- `index.tsx` para o arquivo principal do componente
- Use TypeScript (`.tsx` para componentes React, `.ts` para utilitários)

## 🏗️ Estrutura de Componentes

### Server Components (Padrão)

Prefira Server Components sempre que possível:

```typescript
// components/Header/index.tsx
import { headers } from 'next/headers';
import { detectLanguageFromHeaders } from '@/lib/i18n';

export async function Header() {
  const headersList = await headers();
  const lang = detectLanguageFromHeaders(headersList);
  
  return (
    <header>
      {/* ... */}
    </header>
  );
}
```

### Client Components

Use `'use client'` apenas quando necessário (interatividade, hooks, etc.):

```typescript
// components/SignupForm/index.tsx
'use client';

import { useState } from 'react';

export function SignupForm() {
  const [state, setState] = useState();
  
  return (
    <form>
      {/* ... */}
    </form>
  );
}
```

## 📦 Organização de Imports

### Ordem de Imports

1. React/Next.js imports
2. Third-party libraries
3. Internal components
4. Utilities and types
5. Styles (se houver)

```typescript
// 1. React/Next.js
import { headers } from 'next/headers';
import { useState } from 'react';

// 2. Third-party
import { zodResolver } from '@hookform/resolvers/zod';

// 3. Internal components
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

// 4. Utilities and types
import { detectLanguageFromHeaders } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';
```

### Path Aliases

Use sempre os path aliases configurados:

```typescript
// ✅ Correto
import { Button } from '@/components/ui/button';
import { getTranslations } from '@/lib/i18n';

// ❌ Incorreto
import { Button } from '../../../components/ui/button';
import { getTranslations } from '../../lib/i18n';
```

## 🌐 Internacionalização (i18n)

### Detecção de Idioma

- **Server Components**: Use `detectLanguageFromHeaders(headers())`
- **Client Components**: Use `detectLanguage()` (fallback)

```typescript
// Server Component
import { headers } from 'next/headers';
import { detectLanguageFromHeaders } from '@/lib/i18n';

export async function MyComponent() {
  const headersList = await headers();
  const lang = detectLanguageFromHeaders(headersList);
  const t = getTranslations(lang);
  // ...
}
```

## ✅ Validação de Formulários

### Zod + React Hook Form

Use Zod para validação e React Hook Form para gerenciamento:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSignupSchema } from '@/lib/validations';

const schema = createSignupSchema(lang);
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});
```

## 🔒 Segurança

### Rate Limiting

Todas as APIs devem implementar rate limiting:

```typescript
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

const identifier = getClientIdentifier(request);
const rateLimit = checkRateLimit(identifier, 5, 15 * 60 * 1000);
```

### Honey Pot

Use honey pot fields para prevenir bots:

```typescript
// Campo oculto no formulário
<div className="absolute left-[-9999px] opacity-0 pointer-events-none">
  <Input {...register('website')} />
</div>

// Validação no servidor
if (body.website && body.website.trim().length > 0) {
  // Bot detectado - retornar sucesso silenciosamente
  return NextResponse.json({ success: true }, { status: 200 });
}
```

## 🎨 Estilização

### Tailwind CSS

- Use classes do Tailwind CSS
- Prefira utilitários do Tailwind sobre CSS customizado
- Use variáveis CSS para temas (dark/light)

```typescript
// ✅ Correto
<div className="bg-background text-foreground border border-border">

// ❌ Evite
<div style={{ backgroundColor: '#fff' }}>
```

## 📝 Comentários

### Código em Inglês

- Comentários devem ser em inglês
- Nomes de variáveis e funções em inglês
- Mensagens de usuário podem ser traduzidas via i18n

```typescript
// ✅ Correto
// Honey pot field - hidden from users but visible to bots
const honeyPot = '';

// ❌ Incorreto
// Campo honeypot - escondido dos usuários mas visível para bots
const campoHoneypot = '';
```

## 🧪 Boas Práticas

### Performance

1. **Prefira Server Components**: Menos JavaScript no cliente
2. **Lazy Loading**: Use `dynamic` import para componentes pesados
3. **Image Optimization**: Use `next/image` para todas as imagens

### Acessibilidade

1. Use labels apropriados
2. Adicione `aria-*` attributes quando necessário
3. Mantenha contraste adequado de cores

### TypeScript

1. Use tipos explícitos quando possível
2. Evite `any` - use `unknown` se necessário
3. Exporte tipos quando reutilizáveis

## 📚 Recursos Adicionais

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zod Documentation](https://zod.dev)

---

**Última atualização**: 2024
