# 📱 Mobile Web App - Documentação

Aplicativo multiplataforma desenvolvido com **React Native** e **Expo**, funcionando tanto em dispositivos móveis (iOS/Android) quanto na web.

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Instalação e Execução](#instalação-e-execução)
5. [Arquitetura](#arquitetura)
6. [Telas e Funcionalidades](#telas-e-funcionalidades)
7. [Componentes](#componentes)
8. [Internacionalização](#internacionalização)

---

## 🎯 Visão Geral

Este é um aplicativo empresarial completo que oferece:

- **Autenticação**: Login, Cadastro e Recuperação de Senha
- **Dashboard**: Página inicial com informações e atalhos
- **Módulos**: Vendas, Agenda, Serviços, Mensagens, Insights, Organizações e Configurações
- **Design Responsivo**: Layouts otimizados para mobile e web
- **Idioma**: Todo o aplicativo está em **Português Brasileiro (PT-BR)**

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| React Native | 0.73.x | Framework mobile |
| Expo | ~50.0.x | Plataforma de desenvolvimento |
| expo-router | ~3.4.x | Navegação baseada em arquivos |
| TypeScript | ^5.3.x | Tipagem estática |
| Zustand | ^4.4.x | Gerenciamento de estado |
| React Native Safe Area Context | 4.8.x | Safe areas |
| Expo Vector Icons | ^14.0.x | Ícones (Ionicons) |

---

## 📁 Estrutura do Projeto

```
mobile-web-app/
│
├── app/                          # Rotas do expo-router
│   ├── _layout.tsx               # Layout raiz
│   ├── index.tsx                 # Tela inicial (redirect)
│   ├── login.tsx                 # Rota de login
│   ├── register.tsx              # Rota de cadastro
│   ├── forgot-password.tsx       # Rota de recuperação de senha
│   │
│   ├── mobile/                   # Rotas mobile
│   │   ├── _layout.tsx           # Layout mobile
│   │   ├── home.tsx              # Início
│   │   ├── sales.tsx             # Vendas
│   │   ├── calendar.tsx          # Agenda
│   │   ├── services.tsx          # Serviços
│   │   ├── messages.tsx          # Mensagens
│   │   ├── insights.tsx          # Insights
│   │   ├── organizations.tsx     # Organizações
│   │   └── settings.tsx          # Configurações
│   │
│   └── web/                      # Rotas web
│       ├── _layout.tsx           # Layout web
│       ├── home.tsx              # Início
│       ├── sales.tsx             # Vendas
│       ├── calendar.tsx          # Agenda
│       ├── services.tsx          # Serviços
│       ├── messages.tsx          # Mensagens
│       ├── insights.tsx          # Insights
│       ├── organizations.tsx     # Organizações
│       └── settings.tsx          # Configurações
│
├── src/                          # Código fonte
│   │
│   ├── components/               # Componentes reutilizáveis
│   │   ├── shared/               # Componentes compartilhados
│   │   │   ├── Button.tsx        # Botão customizado
│   │   │   ├── Card.tsx          # Card customizado
│   │   │   ├── Checkbox.tsx      # Checkbox customizado
│   │   │   ├── Input.tsx         # Input customizado
│   │   │   ├── SplashScreen.tsx  # Tela de carregamento
│   │   │   └── index.ts          # Exports
│   │   │
│   │   ├── mobile/               # Componentes mobile
│   │   │   └── layout/
│   │   │       ├── MobileHeader.tsx   # Cabeçalho mobile
│   │   │       ├── MobileLayout.tsx   # Layout base mobile
│   │   │       ├── MobileTabBar.tsx   # Barra de navegação inferior
│   │   │       └── index.ts
│   │   │
│   │   └── web/                  # Componentes web
│   │       └── layout/
│   │           ├── WebHeader.tsx      # Cabeçalho web
│   │           ├── WebLayout.tsx      # Layout base web
│   │           ├── WebSidebar.tsx     # Menu lateral web
│   │           └── index.ts
│   │
│   ├── screens/                  # Telas do aplicativo
│   │   ├── mobile/               # Telas mobile
│   │   │   ├── auth/             # Telas de autenticação
│   │   │   │   ├── MobileLoginScreen.tsx
│   │   │   │   ├── MobileRegisterScreen.tsx
│   │   │   │   └── MobileForgotPasswordScreen.tsx
│   │   │   ├── home/
│   │   │   │   └── MobileHomeScreen.tsx
│   │   │   └── pages/
│   │   │       └── MobilePlaceholderScreens.tsx
│   │   │
│   │   └── web/                  # Telas web
│   │       ├── auth/
│   │       │   ├── WebLoginScreen.tsx
│   │       │   ├── WebRegisterScreen.tsx
│   │       │   └── WebForgotPasswordScreen.tsx
│   │       ├── home/
│   │       │   └── WebHomeScreen.tsx
│   │       └── pages/
│   │           └── WebPlaceholderScreens.tsx
│   │
│   ├── hooks/                    # Hooks customizados
│   │   ├── usePlatform.ts        # Detecta plataforma (mobile/web)
│   │   ├── useResponsive.ts      # Breakpoints responsivos
│   │   └── index.ts
│   │
│   ├── store/                    # Gerenciamento de estado (Zustand)
│   │   ├── authStore.ts          # Estado de autenticação
│   │   ├── appStore.ts           # Estado do aplicativo
│   │   └── index.ts
│   │
│   ├── styles/                   # Estilos globais
│   │   ├── theme.ts              # Tema (cores, espaçamentos, fontes)
│   │   ├── globalStyles.ts       # Estilos globais
│   │   └── index.ts
│   │
│   ├── utils/                    # Utilitários
│   │   └── validation.ts         # Validações (email, senha)
│   │
│   └── i18n/                     # Internacionalização (não utilizado)
│       ├── locales/
│       │   └── pt.ts
│       ├── types.ts
│       ├── useTranslation.ts
│       └── index.ts
│
├── assets/                       # Recursos estáticos (imagens, fontes)
├── app.json                      # Configuração do Expo
├── babel.config.js               # Configuração do Babel
├── metro.config.js               # Configuração do Metro Bundler
├── tsconfig.json                 # Configuração do TypeScript
├── package.json                  # Dependências e scripts
└── README.md                     # Documentação básica
```

---

## 🚀 Instalação e Execução

### Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Git**

### Passo a Passo

#### 1. Clonar o Repositório

```bash
# Clone o repositório
git clone <URL_DO_REPOSITORIO>

# Entre na pasta do projeto
cd mobile-web-app
```

#### 2. Instalar Dependências

```bash
# Instalar todas as dependências
npm install
```

#### 3. Executar o Aplicativo

```bash
# Iniciar no modo web
npx expo start --web

# OU iniciar e escolher a plataforma
npx expo start
```

#### 4. Acessar o Aplicativo

- **Web**: Abra [http://localhost:8081](http://localhost:8081) no navegador
- **Mobile (Expo Go)**: Escaneie o QR Code com o app Expo Go

### Comandos Úteis

```bash
# Iniciar para web
npx expo start --web

# Iniciar para Android
npx expo start --android

# Iniciar para iOS
npx expo start --ios

# Limpar cache e iniciar
npx expo start --clear

# Build de produção web
npx expo export --platform web
```

---

## 🏗️ Arquitetura

### Padrão de Organização

O projeto segue uma arquitetura **modular e escalável**:

```
┌─────────────────────────────────────────────────────────────┐
│                         app/ (Rotas)                        │
│    Responsável apenas pelo roteamento e redirecionamento    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    src/screens/ (Telas)                     │
│       Contém a lógica e estrutura de cada tela              │
│       Separado por plataforma: mobile/ e web/               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 src/components/ (Componentes)               │
│     shared/ - Componentes reutilizáveis em ambas           │
│     mobile/ - Componentes específicos mobile                │
│     web/ - Componentes específicos web                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    src/store/ (Estado)                      │
│           Zustand para gerenciamento de estado              │
└─────────────────────────────────────────────────────────────┘
```

### Fluxo de Navegação

```
                    ┌──────────────┐
                    │    index     │
                    │  (Splash)    │
                    └──────┬───────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
     ┌────────────────┐       ┌────────────────┐
     │     Login      │       │   Cadastro     │
     └────────┬───────┘       └────────────────┘
              │
              │ (autenticado)
              ▼
     ┌────────────────┐
     │ Detecta        │
     │ Plataforma     │
     └────────┬───────┘
              │
    ┌─────────┴─────────┐
    │                   │
    ▼                   ▼
┌────────┐         ┌────────┐
│ Mobile │         │  Web   │
│ Layout │         │ Layout │
└────────┘         └────────┘
```

---

## 📱 Telas e Funcionalidades

### Autenticação

| Tela | Descrição | Campos |
|------|-----------|--------|
| **Login** | Entrada no sistema | E-mail, Senha, Lembrar-me |
| **Cadastro** | Criação de conta | Nome, E-mail, Senha, Confirmar Senha |
| **Recuperar Senha** | Reset de senha | E-mail |

### Módulos Principais

| Módulo | Ícone | Descrição |
|--------|-------|-----------|
| **Início** | 🏠 | Página inicial (Em breve) |
| **Vendas** | 🛒 | Gerenciamento de vendas (Em breve) |
| **Agenda** | 📅 | Calendário e compromissos (Em breve) |
| **Serviços** | 🔧 | Gerenciamento de serviços (Em breve) |
| **Mensagens** | 💬 | Chat e comunicação (Em breve) |
| **Insights** | 📊 | Relatórios e análises (Em breve) |
| **Organizações** | 🏢 | Gestão de organizações (Em breve) |
| **Configurações** | ⚙️ | Preferências do sistema (Em breve) |

---

## 🧩 Componentes

### Componentes Compartilhados (`src/components/shared/`)

| Componente | Descrição | Props Principais |
|------------|-----------|------------------|
| `Button` | Botão customizado | `title`, `onPress`, `variant`, `loading` |
| `Input` | Campo de entrada | `label`, `placeholder`, `secureTextEntry`, `error` |
| `Card` | Card container | `title`, `icon`, `onPress`, `children` |
| `Checkbox` | Caixa de seleção | `checked`, `onToggle`, `label` |
| `SplashScreen` | Tela de carregamento | - |

### Layout Mobile (`src/components/mobile/layout/`)

| Componente | Descrição |
|------------|-----------|
| `MobileLayout` | Container base com header e tab bar |
| `MobileHeader` | Cabeçalho com título e ações |
| `MobileTabBar` | Navegação inferior (5 abas) |

### Layout Web (`src/components/web/layout/`)

| Componente | Descrição |
|------------|-----------|
| `WebLayout` | Container base com sidebar e header |
| `WebHeader` | Cabeçalho com busca e perfil |
| `WebSidebar` | Menu lateral de navegação |

---

## 🌍 Internacionalização

### Idioma: Português Brasileiro (PT-BR)

Todo o aplicativo está em português, com as strings diretamente nos componentes (sem arquivos de tradução externos).

### Exemplos de Textos

**Autenticação:**
- "Entrar" / "Criar Conta" / "Recuperar Senha"
- "E-mail" / "Senha" / "Confirmar Senha"
- "Lembrar-me" / "Esqueci minha senha"

**Validações:**
- "E-mail inválido"
- "A senha deve ter pelo menos 8 caracteres"
- "A senha deve conter pelo menos uma letra maiúscula"
- "A senha deve conter pelo menos um número"
- "A senha deve conter pelo menos um caractere especial"

**Navegação:**
- "Início" / "Vendas" / "Agenda" / "Serviços"
- "Mensagens" / "Insights" / "Organizações" / "Configurações"

**Mensagens:**
- "Carregando..." / "🚧 Em breve"

---

## 📝 Observações Importantes

1. **Estrutura Modular**: O código está organizado para facilitar a manutenção e escalabilidade.

2. **Separação de Plataformas**: Mobile e Web têm layouts e componentes específicos para melhor experiência.

3. **TypeScript**: Todo o projeto usa TypeScript para maior segurança e autocompletar.

4. **Estado Global**: Zustand gerencia autenticação e estado do app de forma simples e eficiente.

5. **Telas Placeholder**: A maioria das telas mostra "Em breve" - prontas para implementação futura.

---

## 🤝 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido com ❤️ em React Native + Expo**
