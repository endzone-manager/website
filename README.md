# Redzone Boss - Website

Landing page para o Redzone Boss, um simulador de estratégia de futebol americano.

## 🏈 Sobre

Este é um site simples de landing page desenvolvido com Next.js para promover o Redzone Boss e coletar cadastros de interessados no projeto.

## ✨ Funcionalidades

- **Detecção automática de idioma**: O site detecta automaticamente o idioma do navegador (Português ou Inglês)
- **Formulário de cadastro**: Coleta nome e email dos interessados
- **Design responsivo**: Funciona perfeitamente em desktop e mobile
- **Tema claro/escuro**: Suporte automático ao tema do sistema

## 🚀 Como executar

1. Instale as dependências:

```bash
npm install
```

2. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

3. Acesse [http://localhost:3000](http://localhost:3000)

## 📝 Formulário de Cadastro

O formulário de cadastro está configurado para coletar nome e email. Para integrar com um serviço de email ou API, edite o arquivo `components/signup-form.tsx` e adicione sua lógica de envio.

Exemplo de integração:

```typescript
// Em components/signup-form.tsx
await fetch('/api/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, name }),
});
```

## 🎨 Personalização

- **Logo**: Adicione a logo do Redzone Boss em `public/logo.png`
- **Cores**: As cores do tema podem ser ajustadas em `app/globals.css`
- **Traduções**: Edite os textos em `lib/i18n.ts`

## 📦 Tecnologias

- [Next.js](https://nextjs.org/) - Framework React
- [Tailwind CSS](https://tailwindcss.com/) - Estilização
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [next-themes](https://github.com/pacocoursey/next-themes) - Gerenciamento de tema

## 📄 Licença

© 2024 Redzone Boss. Todos os direitos reservados.
