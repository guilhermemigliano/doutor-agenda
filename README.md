# Doutor Agenda 🩺

![Dashboard da Clínica+](https://github.com/guilhermemigliano/doutor-agenda/tree/main/public/interface/dashboard.png)

Sistema moderno de agendamento de consultas médicas com painel administrativo e gerenciamento de pacientes e médicos. Desenvolvido com tecnologias modernas para uma experiência eficiente e segura.

Este projeto foi desenvolvido durante o bootcamp pago da **FullStackClub**

## ✨ Funcionalidades Principais

### Gerenciamento Completo (CRUD)

- Médicos
- Pacientes
- Agendamentos

### Dashboard Interativo

- Visualização de dados e métricas importantes da clínica.

### Sistema de Autenticação

- Criação de conta e login seguros.
- Login social com Google (OAuth).

### Integração com Stripe

- Gerenciamento de assinaturas e pagamentos para o SaaS.

### Interface Moderna e Responsiva

- Design acessível e agradável com Radix UI + Tailwind CSS.

## 🔧 Tecnologias Utilizadas

### 🖥️ Frontend e Backend

- **Next.js**: Framework React full-stack usado para criar a interface do sistema e as APIs.
- **React 19**: Biblioteca principal para construção da interface.
- **Tailwind CSS**: Estilização moderna e responsiva com utilitários.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Drizzle ORM**: ORM moderno para interagir com o banco de dados PostgreSQL.
- **PostgreSQL (`pg`)**: Banco de dados relacional robusto.
- **Stripe**: Integração de pagamentos online.
- **React Hook Form + Zod**: Manipulação e validação de formulários.
- **Shadcn UI**: Componentes acessíveis e estilizados para interface.
- **React Query**: Gerenciamento de dados assíncronos com cache e sincronização.
- **Better Auth**: Solução de autenticação simples e segura para aplicações Next.js.
- **Lucide React**: Ícones SVG modernos e personalizáveis.
- **Recharts**: Visualização de dados com gráficos.
- **Day.js / date-fns**: Manipulação de datas.

### 📦 Outras bibliotecas úteis

- **clsx / class-variance-authority / tailwind-merge**: Gerenciamento avançado de classes CSS.
- **React Number Format**: Formatação de campos numéricos como CPF, telefone etc.
- **React Day Picker**: Seleção de datas com suporte a calendários customizados.
- **Sonner**: Toasts e notificações elegantes.

### 🛠️ Desenvolvimento

- **ESLint / Prettier**: Padronização de código.
- **Faker.js**: Geração de dados fake para simular dados durante o desenvolvimento.
- **Drizzle Kit**: CLI para geração de migrações e sincronização com banco.
- **tsx**: Execução de arquivos TypeScript diretamente via CLI.

## 📁 Scripts disponíveis

| Comando                     | Descrição                                  |
| --------------------------- | ------------------------------------------ |
| `npm run dev`               | Inicia a aplicação em modo desenvolvimento |
| `npm run build`             | Gera a versão de produção                  |
| `npm run start`             | Inicia a aplicação em produção             |
| `npm run lint`              | Executa o linter                           |
| `npm run seed:doctors`      | Popula o banco com médicos fake            |
| `npm run seed:patients`     | Popula o banco com pacientes fake          |
| `npm run seed:appointments` | Popula o banco com agendamentos fake       |

## ⚙️ Estrutura de Diretórios

```
.
├── src/
│   ├── app/               # Rotas e páginas com Next.js App Router
│   ├── components/        # Componentes reutilizáveis
│   ├── db/                # Configuração e schema do Drizzle ORM
│   ├── hooks/             # Hooks personalizados
│   ├── lib/               # Funções utilitárias
│   ├── scripts/           # Scripts de seed
│   ├── styles/            # Estilos globais
│   └── types/             # Tipagens compartilhadas
```

## ⚙️ Variáveis de Ambiente

As seguintes variáveis de ambiente precisam ser configuradas no seu arquivo `.env` para o correto funcionamento da aplicação:

```env
# URL da sua base de dados PostgreSQL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Segredos para a autenticação com Better Auth
BETTER_AUTH_SECRET="[SENHA_PARA_BETTER_AUTH]"
BETTER_AUTH_URL="http://localhost:3000" # Ou a URL de produção

# Credenciais do Google OAuth para login social
GOOGLE_CLIENT_ID="[SEU_GOOGLE_CLIENT_ID]"
GOOGLE_CLIENT_SECRET="[SEU_GOOGLE_CLIENT_SECRET]"

# Chaves do Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="[SUA_CHAVE_PUBLICAVEL_STRIPE]"
STRIPE_SECRET_KEY="[SUA_CHAVE_SECRETA_STRIPE]"
STRIPE_ESSENTIAL_PLAN_PRICE_ID="[ID_DO_SEU_PLANO_ESSENCIAL_NO_STRIPE]"
STRIPE_WEBHOOK_SECRET="[SEU_SEGREDO_DO_WEBHOOK_STRIPE]" # Use `npm run stripe:listen:dev` para obter um durante o desenvolvimento
NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL="[URL_DO_SEU_PORTAL_DO_CLIENTE_STRIPE]"

# URL pública da sua aplicação
NEXT_PUBLIC_APP_URL="http://localhost:3000" # Ou a URL de produção
```

## 📦 Instalação e Execução Local

```bash
git clone https://github.com/guilhermemigliano/doutor-agenda
cd doutor-agenda

# Instale as dependências
npm install

# Configure variáveis de ambiente (.env)

# Execute o projeto
npm run dev
```

## 🗃️ Banco de Dados

- Configure seu PostgreSQL e defina as variáveis no `.env`
- Execute as seeds (caso queira importar dados fakes) com:

```bash
npm run seed:doctors
npm run seed:patients
npm run seed:appointments
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
