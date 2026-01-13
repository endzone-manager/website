# Configuração do Supabase para Newsletter Signups

Este guia explica como configurar a tabela no Supabase para armazenar os cadastros da newsletter.

## 📋 Pré-requisitos

1. Conta no [Supabase](https://supabase.com)
2. Projeto criado no Supabase
3. Variáveis de ambiente configuradas no projeto:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## 🗄️ Criando a Tabela

### Opção 1: Via SQL Editor (Recomendado)

1. Acesse o **SQL Editor** no dashboard do Supabase
2. Copie e cole o conteúdo do arquivo `docs/supabase-schema.sql`
3. Clique em **Run** para executar o script

### Opção 2: Via Table Editor

1. Acesse o **Table Editor** no dashboard do Supabase
2. Clique em **New Table**
3. Configure a tabela com os seguintes campos:

| Column Name | Type | Default Value | Constraints |
|------------|------|---------------|-------------|
| id | uuid | gen_random_uuid() | PRIMARY KEY |
| email | text | - | NOT NULL, UNIQUE |
| name | text | - | NOT NULL |
| language | text | - | NOT NULL, CHECK (language IN ('pt-BR', 'en-US')) |
| created_at | timestamptz | NOW() | - |
| updated_at | timestamptz | NOW() | - |
| ip_address | text | - | - |
| user_agent | text | - | - |
| source | text | 'website' | - |

4. Clique em **Save** para criar a tabela

## 🔒 Configurando Row Level Security (RLS)

A tabela já está configurada com RLS no script SQL. As políticas permitem:

- **Inserção**: A role `anon` (chave pública) pode inserir dados (via API sem autenticação)
- **Inserção (backup)**: A role `service_role` também pode inserir (se usar service role key)
- **Leitura**: Usuários autenticados podem ler os dados (opcional)

### ⚠️ Importante sobre Segurança

Como estamos permitindo inserção via `anon` (chave pública), é importante:

1. **Rate Limiting**: A API já implementa rate limiting (5 requisições por 15 minutos)
2. **Validação**: Os dados são validados com Zod antes de inserir
3. **Honey Pot**: Proteção contra bots implementada
4. **Email único**: Constraint UNIQUE no email previne duplicatas

Para maior segurança em produção, considere:
- Usar a `service_role` key no servidor (nunca exponha no cliente!)
- Adicionar CAPTCHA ao formulário
- Implementar validação adicional no backend

## 🔑 Configurando as Variáveis de Ambiente

No seu arquivo `.env.local` ou nas variáveis de ambiente do seu provedor de hospedagem:

```env
# Supabase Configuration (obrigatório)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key

# Service Role Key (RECOMENDADO para API routes - bypassa RLS)
# ⚠️ NUNCA exponha esta chave no cliente! Apenas no servidor.
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Importante**: A API route agora usa `SUPABASE_SERVICE_ROLE_KEY` se disponível, caso contrário usa `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. A service_role key bypassa RLS e é mais segura para operações server-side.

### Onde encontrar as chaves:

1. Acesse **Settings** > **API** no dashboard do Supabase
2. **Project URL**: `NEXT_PUBLIC_SUPABASE_URL`
3. **anon/public key**: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (para leitura pública)
4. **service_role key**: Use esta para inserção segura (nunca exponha no cliente!)

## 📊 Estrutura da Tabela

### Campos Principais

- **id**: UUID único gerado automaticamente
- **email**: Email do usuário (único, não pode duplicar)
- **name**: Nome do usuário
- **language**: Idioma detectado (pt-BR ou en-US)
- **created_at**: Data e hora do cadastro
- **updated_at**: Data e hora da última atualização
- **ip_address**: IP do usuário (para analytics)
- **user_agent**: User agent do navegador (para analytics)
- **source**: Origem do cadastro (padrão: 'website')

### Índices

- Índice em `email` para buscas rápidas
- Índice em `created_at` para ordenação e filtros

## 🔍 Visualizando os Dados

### Via Dashboard

1. Acesse **Table Editor** > **newsletter_signups**
2. Visualize todos os cadastros em formato de tabela

### Via SQL

```sql
-- Ver todos os signups
SELECT * FROM newsletter_signups ORDER BY created_at DESC;

-- Ver signups por idioma
SELECT language, COUNT(*) as total 
FROM newsletter_signups 
GROUP BY language;

-- Ver signups por data
SELECT DATE(created_at) as date, COUNT(*) as total
FROM newsletter_signups
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Usar a view de analytics
SELECT * FROM newsletter_signups_analytics;
```

## 🧪 Testando

Após configurar tudo, teste o formulário:

1. Preencha o formulário no site
2. Verifique no Supabase se o registro foi criado
3. Verifique os logs do servidor para erros

## 🔧 Troubleshooting

### Erro: "relation does not exist"

- Certifique-se de que executou o script SQL corretamente
- Verifique se está no schema correto (geralmente `public`)

### Erro: "new row violates row-level security policy" (42501)

Este erro ocorre quando a política RLS não permite inserção. Soluções:

**Opção 1: Executar o script de correção**
```sql
-- Execute o arquivo docs/fix-rls-policy.sql no SQL Editor
```

**Opção 2: Adicionar política manualmente**
```sql
CREATE POLICY "Allow anon to insert newsletter signups"
  ON newsletter_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

**Opção 3: Usar service role key**
- Use a `service_role` key no servidor (nunca exponha no cliente!)
- A política para `service_role` já está no schema

### Erro: "duplicate key value"

- O email já existe no banco
- A API retorna sucesso mesmo assim (para não revelar que o email já existe)

### Erro: "new row violates check constraint"

- O valor de `language` não é 'pt-BR' ou 'en-US'
- Verifique a lógica de detecção de idioma na API

## 📝 Próximos Passos

1. Configure exportação de dados (CSV, JSON)
2. Configure integração com serviço de email (Resend, SendGrid, etc.)
3. Configure webhooks para notificações
4. Configure backups automáticos

## 🔗 Recursos

- [Documentação do Supabase](https://supabase.com/docs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Client Libraries](https://supabase.com/docs/reference)
