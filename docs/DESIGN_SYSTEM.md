# Design System UI - Documentação

Este documento descreve o Design System UI utilizado neste projeto e como aplicá-lo em outros projetos.

## Visão Geral

Este projeto utiliza o **[shadcn/ui](https://ui.shadcn.com/)** como Design System base. O shadcn/ui é uma coleção de componentes reutilizáveis construídos com:

- **Radix UI** - Componentes acessíveis e sem estilo
- **Tailwind CSS** - Sistema de estilização utilitária
- **Class Variance Authority (CVA)** - Gerenciamento de variantes de componentes
- **Lucide React** - Biblioteca de ícones

## Configuração Atual

### Estilo
- **Variante**: `new-york` (estilo mais refinado e elegante)
- **Base Color**: `neutral`
- **CSS Variables**: Habilitado (permite fácil customização de temas)

### Tecnologias Principais

```json
{
  "@radix-ui/react-checkbox": "^1.3.1",
  "@radix-ui/react-dropdown-menu": "^2.1.14",
  "@radix-ui/react-label": "^2.1.6",
  "@radix-ui/react-slot": "^1.2.2",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "lucide-react": "^0.511.0",
  "next-themes": "^0.4.6",
  "tailwind-merge": "^3.3.0",
  "tailwindcss": "^3.4.1",
  "tailwindcss-animate": "^1.0.7"
}
```

## Componentes Disponíveis

Os seguintes componentes UI estão instalados e disponíveis em `components/ui/`:

- ✅ **Badge** (`badge.tsx`)
- ✅ **Button** (`button.tsx`)
- ✅ **Card** (`card.tsx`)
- ✅ **Checkbox** (`checkbox.tsx`)
- ✅ **Dropdown Menu** (`dropdown-menu.tsx`)
- ✅ **Input** (`input.tsx`)
- ✅ **Label** (`label.tsx`)

## Como Aplicar em Outro Projeto

### 1. Instalação Inicial

#### Pré-requisitos
- Next.js 13+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS configurado

#### Passo 1: Instalar Dependências

```bash
npm install class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-checkbox @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-slot
npm install lucide-react
npm install next-themes
npm install -D tailwindcss-animate
```

### 2. Configuração do Tailwind CSS

#### Arquivo: `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
```

### 3. Configuração de CSS Variables

#### Arquivo: `app/globals.css` (ou seu arquivo CSS global)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 72% 51%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 72% 51%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 7%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 72% 51%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 72% 51%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### 4. Utilitário `cn()` (Obrigatório)

#### Arquivo: `lib/utils.ts`

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 5. Configuração do shadcn/ui

#### Arquivo: `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

**Nota**: Ajuste os caminhos (`aliases`) conforme a estrutura do seu projeto.

### 6. Instalação via CLI (Recomendado)

A forma mais fácil de instalar componentes é usando o CLI do shadcn/ui:

```bash
# Instalar CLI globalmente (opcional)
npm install -g shadcn-ui@latest

# Ou usar npx diretamente
npx shadcn@latest init
```

O CLI irá:
- Criar o arquivo `components.json`
- Configurar o Tailwind CSS
- Adicionar as CSS variables
- Criar a estrutura de pastas

Depois, adicione componentes individualmente:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# etc...
```

## Estrutura de Componentes

### Exemplo: Button Component

Os componentes seguem este padrão:

```typescript
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: '...',
        destructive: '...',
        outline: '...',
        // etc
      },
      size: {
        default: '...',
        sm: '...',
        lg: '...',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

## Uso dos Componentes

### Exemplo Básico

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exemplo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" />
          </div>
          <Button variant="default">Enviar</Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Variantes do Button

```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

## Dark Mode

O projeto suporta dark mode através do `next-themes`. Para habilitar:

### 1. Instalar next-themes

```bash
npm install next-themes
```

### 2. Criar ThemeProvider

```tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### 3. Usar no Layout

```tsx
import { ThemeProvider } from '@/components/ThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Customização de Cores

Para customizar as cores do tema, edite as CSS variables em `globals.css`:

```css
:root {
  --primary: 0 72% 51%; /* Cor primária (HSL) */
  --primary-foreground: 0 0% 98%; /* Cor do texto sobre primária */
  /* ... outras cores */
}
```

Use ferramentas como [HSL Color Picker](https://hslpicker.com/) para encontrar valores HSL.

## Recursos Adicionais

- **Documentação Oficial**: https://ui.shadcn.com/
- **Radix UI**: https://www.radix-ui.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **Lucide Icons**: https://lucide.dev/
- **Class Variance Authority**: https://cva.style/

## Componentes Adicionais Disponíveis

O shadcn/ui oferece muitos outros componentes que podem ser adicionados conforme necessário:

- Accordion
- Alert
- Alert Dialog
- Avatar
- Calendar
- Dialog
- Form
- Select
- Sheet
- Skeleton
- Switch
- Table
- Tabs
- Toast
- Tooltip
- E muitos outros...

Para adicionar novos componentes:

```bash
npx shadcn@latest add [component-name]
```

## Notas Importantes

1. **TypeScript**: Todos os componentes são escritos em TypeScript e requerem TypeScript no projeto
2. **Next.js App Router**: Este projeto usa App Router. Para Pages Router, ajuste os caminhos
3. **Server Components**: Os componentes são compatíveis com React Server Components (RSC)
4. **Acessibilidade**: Todos os componentes são construídos sobre Radix UI, garantindo acessibilidade por padrão
5. **Customização**: Os componentes podem ser totalmente customizados, pois são copiados para o seu projeto (não são dependências)

## Checklist de Migração

- [ ] Instalar todas as dependências necessárias
- [ ] Configurar `tailwind.config.ts` com as cores e variáveis
- [ ] Adicionar CSS variables em `globals.css`
- [ ] Criar arquivo `lib/utils.ts` com função `cn()`
- [ ] Criar arquivo `components.json`
- [ ] Instalar componentes necessários via CLI
- [ ] Configurar dark mode (se necessário)
- [ ] Testar componentes em desenvolvimento
- [ ] Ajustar cores e temas conforme necessário
