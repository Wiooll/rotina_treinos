# Rotina de Treinos

Aplicativo para gerenciamento de rotinas de treinos, permitindo criar, editar e acompanhar seus treinos.

## Funcionalidades

- ✨ Criação e gerenciamento de treinos
- 📝 Adição de exercícios com detalhes (séries, repetições, peso)
- ⏱️ Temporizador para descanso entre séries
- 📅 Calendário para agendamento de treinos
- 📊 Acompanhamento de progresso
- 🌙 Modo escuro/claro
- 💾 Armazenamento local dos dados

## Tecnologias

- React
- React Router
- Framer Motion
- Tailwind CSS
- LocalStorage para persistência
- Service Worker para cache

## Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
├── contexts/         # Contextos React (tema, autenticação, treinos)
├── pages/           # Páginas/rotas da aplicação
├── services/        # Serviços (storage, etc)
└── styles/          # Estilos globais
```

## Instalação

1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/rotina-treinos.git
```

2. Instale as dependências

```bash
cd rotina-treinos
npm install
```

3. Inicie o servidor de desenvolvimento

```bash
npm start
```

## Solução de Problemas

Consulte o arquivo [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) para uma lista completa de problemas conhecidos e suas soluções.

## Boas Práticas

- Validação rigorosa de dados antes de salvar
- Feedback visual para todas as ações do usuário
- Tratamento adequado de erros
- Interface responsiva e acessível
- Código limpo e bem documentado

## Checklist de Desenvolvimento

Antes de submeter alterações:

1. Execute os testes

```bash
npm test
```

2. Verifique o lint

```bash
npm run lint
```

3. Consulte o checklist em [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

## Contribuindo

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
