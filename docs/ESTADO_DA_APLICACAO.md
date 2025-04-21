# Estado da Aplicação - Malhaê

## Visão Geral

Malhaê é uma aplicação web para acompanhamento de treinos e evolução física, desenvolvida em React com autenticação via Clerk.

## Estrutura do Projeto

### Tecnologias Principais

- React 18.2.0
- React Router DOM v6.20.0
- Clerk v4.29.7 (Autenticação)
- TailwindCSS + HeadlessUI v1.7.0 (Estilização)
- React Hot Toast v2.4.1 (Notificações)
- Framer Motion v6.0.0 (Animações)
- UUID v9.0.0 (Geração de IDs únicos)
- Jest + React Testing Library (Testes)
- Cypress (Testes E2E)
- ESLint + Prettier (Qualidade de código)

### Organização de Diretórios

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── contexts/      # Contextos React
├── services/      # Serviços e utilitários
├── App.jsx        # Componente principal
└── index.js       # Ponto de entrada
```

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

## Estado dos Dados

### Estrutura de Dados Principal

```typescript
interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  createdAt: string;
  updatedAt: string;
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}

interface BodyMeasurement {
  id: string;
  date: string;
  weight?: number;
  height?: number;
  measurements: {
    chest?: number;
    waist?: number;
    arms?: number;
    legs?: number;
    // ... outras medidas
  };
}
```

## Funcionalidades Implementadas

1. **Autenticação**

   - Login/Registro via Clerk
   - Rotas protegidas
   - Persistência de sessão

2. **Gestão de Treinos**

   - Criação/Edição/Exclusão de treinos
   - Organização por categorias
   - Templates de treino

3. **Execução de Treinos**

   - Interface intuitiva
   - Registro em tempo real
   - Histórico de execução

4. **Medidas Corporais**

   - Registro periódico
   - Visualização de progresso
   - Gráficos comparativos

5. **Personalização**
   - Tema claro/escuro
   - Interface responsiva
   - Notificações personalizadas

## Próximos Passos

1. Implementação de API Backend

   - [ ] Definir estrutura de API
   - [ ] Implementar autenticação JWT
   - [ ] Criar endpoints RESTful

2. Melhorias de UX

   - [ ] Adicionar mais feedback visual
   - [ ] Melhorar animações de transição
   - [ ] Implementar modo offline

3. Novas Funcionalidades

   - [ ] Sistema de metas
   - [ ] Compartilhamento de treinos
   - [ ] Integração com wearables

4. Otimizações
   - [ ] Implementar PWA
   - [ ] Melhorar performance
   - [ ] Otimizar bundle size

## Observações Técnicas

- Service Worker implementado para melhor experiência offline
- Uso de TailwindCSS para estilização consistente
- Componentes modulares seguindo princípios SOLID
- Sistema de rotas organizado e protegido
- Persistência local via localStorage com validação de dados

## Testes

### Testes Unitários
- Framework: Jest + React Testing Library
- Cobertura mínima: 80%
- Foco em componentes críticos e lógica de negócio

### Testes E2E
- Framework: Cypress
- Cenários principais testados
- Integração com CI/CD

### Testes de Performance
- Lighthouse scores monitorados
- Web Vitals tracking
- Performance budget definido

## CI/CD

### GitHub Actions
- Build e testes automatizados
- Análise de qualidade de código
- Deploy automático para staging

### Ambientes
- Desenvolvimento: Local
- Staging: Vercel Preview
- Produção: Vercel Production

### Monitoramento
- Sentry para tracking de erros
- Google Analytics para métricas de uso
- LogRocket para session replay

## Segurança

- Autenticação robusta via Clerk
- Validação de dados em todas as entradas
- Sanitização de inputs
- Proteção contra XSS
- Rate limiting implementado
- CORS configurado adequadamente
- Headers de segurança configurados
- CSP implementada
- Auditoria regular de dependências
- 2FA habilitado para deploys

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
