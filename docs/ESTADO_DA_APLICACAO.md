# Estado da Aplicação - Malhaê

## Visão Geral

Malhaê é uma aplicação web para acompanhamento de treinos e evolução física, desenvolvida em React com autenticação via Clerk.

## Estrutura do Projeto

### Tecnologias Principais

- React 18
- React Router DOM v6
- Clerk (Autenticação)
- TailwindCSS (Estilização)
- React Hot Toast (Notificações)
- Framer Motion (Animações)

### Contextos

1. **ThemeContext**

   - Gerencia o tema claro/escuro da aplicação
   - Persiste a preferência do usuário
   - Aplicado globalmente através do ThemeProvider

2. **WorkoutContext**
   - Gerencia o estado dos treinos
   - Funcionalidades:
     - CRUD de treinos
     - Acompanhamento de progresso
     - Histórico de treinos
     - Medidas corporais

### Componentes Principais

#### Páginas

1. **Dashboard**

   - Visão geral do progresso
   - Próximos treinos
   - Estatísticas rápidas

2. **WorkoutPlanner**

   - Criação e edição de treinos
   - Adição de exercícios
   - Configuração de séries e repetições

3. **WorkoutExecution**

   - Execução do treino em tempo real
   - Acompanhamento de séries
   - Registro de progresso

4. **History**

   - Histórico de treinos realizados
   - Estatísticas de evolução
   - Visualização detalhada

5. **Progress**

   - Gráficos de evolução
   - Comparativo de medidas
   - Metas e objetivos

6. **BodyMeasurements**

   - Registro de medidas corporais
   - Acompanhamento de evolução
   - Histórico de medidas

7. **Settings**
   - Configurações do usuário
   - Preferências de tema
   - Configurações de conta

#### Componentes Reutilizáveis

1. **Navbar**

   - Navegação principal
   - Responsiva para mobile
   - Integração com tema

2. **ExerciseForm**
   - Formulário de exercícios
   - Validação de campos
   - Integração com WorkoutContext

## Fluxo de Autenticação

- Implementado via Clerk
- Rotas protegidas usando `SignedIn` e `SignedOut`
- Páginas de login/signup personalizadas
- Redirecionamento automático para login quando necessário

## Estado da Dados

- Treinos: Nome, exercícios, séries, repetições
- Exercícios: Nome, categoria, peso, séries, repetições
- Medidas: Peso, altura, circunferências
- Progresso: Histórico de treinos, evolução de medidas

## Funcionalidades Ativas

1. **Gestão de Treinos**

   - Criação de treinos personalizados
   - Adição de exercícios
   - Configuração de séries e repetições

2. **Execução de Treinos**

   - Interface para acompanhamento
   - Registro de séries completadas
   - Progresso em tempo real

3. **Acompanhamento**

   - Registro de medidas corporais
   - Histórico de treinos
   - Visualização de progresso

4. **Personalização**
   - Tema claro/escuro
   - Interface responsiva
   - Notificações toast

## Próximos Passos

1. Implementar sincronização com backend
2. Adicionar mais tipos de gráficos
3. Implementar sistema de metas
4. Adicionar compartilhamento de treinos
5. Implementar sistema de conquistas

## Observações Técnicas

- Variáveis de ambiente configuradas para Clerk
- Sistema de rotas protegidas implementado
- Contextos para gerenciamento de estado
- Componentes modulares e reutilizáveis
- Estilização consistente com TailwindCSS

## Erros Corrigidos e Lições Aprendidas

### 1. Configuração do Clerk

- **Erro**: Chave pública do Clerk não encontrada
- **Causa**: Confusão entre Vite e Create React App na forma de acessar variáveis de ambiente
- **Solução**:
  - Usar `process.env.REACT_APP_` para variáveis de ambiente no Create React App
  - Manter consistência no prefixo das variáveis de ambiente
- **Prevenção**:
  - Documentar claramente qual bundler está sendo usado
  - Padronizar o uso de variáveis de ambiente no projeto

### 2. Timer de Treino

- **Erro**: Componente Timer removido causando erros de compilação
- **Causa**: Referências remanescentes ao componente Timer após sua remoção
- **Solução**:
  - Remover todas as referências ao TimerModal
  - Atualizar WorkoutExecution para funcionar sem timer
  - Remover estados e funções relacionadas ao timer
- **Prevenção**:
  - Fazer busca global por referências antes de remover componentes
  - Atualizar documentação quando remover funcionalidades

### 3. Visibilidade de Textos

- **Erro**: Textos não visíveis em modo escuro
- **Causa**: Falta de contraste adequado nas classes do Tailwind
- **Solução**:
  - Adicionar classes específicas para modo escuro (dark:text-white)
  - Melhorar contraste de fundos (dark:bg-gray-800)
  - Padronizar cores de texto e fundo
- **Prevenção**:
  - Sempre incluir variantes dark: nas classes de cor
  - Manter consistência nas cores do tema
  - Testar em ambos os modos (claro/escuro)

### 4. Formulários

- **Erro**: Campos de input não visíveis
- **Causa**: Classes de estilo incorretas ou conflitantes
- **Solução**:
  - Criar classes reutilizáveis para inputs
  - Melhorar contraste e visibilidade
  - Padronizar estilos de formulários
- **Prevenção**:
  - Usar componentes reutilizáveis para formulários
  - Manter consistência nos estilos
  - Documentar padrões de estilo

### Boas Práticas Implementadas

1. **Variáveis de Ambiente**

   - Usar prefixo REACT*APP* para todas as variáveis
   - Documentar todas as variáveis necessárias
   - Manter arquivo .env.example atualizado

2. **Componentes**

   - Remover completamente componentes não utilizados
   - Atualizar documentação ao remover funcionalidades
   - Manter consistência nos nomes e estilos

3. **Estilização**

   - Sempre incluir variantes para modo escuro
   - Usar classes reutilizáveis
   - Manter consistência nas cores e espaçamentos

4. **Formulários**
   - Padronizar estilos de inputs
   - Implementar validação consistente
   - Manter feedback visual claro
