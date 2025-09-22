## Quality Review

Itens verificados:

- Estrutura Nuxt: pastas `pages`, `layouts`, `components`, `server/api` presentes.
- Tailwind + tema dark configurado via CSS custom properties e `darkMode: class`.
- Componentes base estilo shadcn simplificados: Button, Card, Input, Sidebar, NavHorizontal.
- Layouts: `default` e `dashboard` com sidebar.
- Páginas principais implementadas (home, categorias dinâmica, produto, dashboard com overview, listagem, novo e edição de produto, configurações placeholder).
- Validação com VeeValidate + Zod nas telas de novo/edição produto.
- date-fns centralizado em `lib/date.ts`.
- Toggle de tema usando `@nuxtjs/color-mode` (necessita dependência instalada).

Pendências / Observações Técnicas:

1. Instalar dependências (npm install) para remover erros de tipos (#imports, auto-imports Nuxt, vee-validate, etc.).
2. Sem persistência real: mutações são apenas em memória (cache da chamada `useFetch`). Próximo passo: implementar API POST/PUT (ex: `server/api/products.post.ts`, `server/api/products/[id].put.ts`).
3. Não há carrinho: adicionar store (ex: `useCart()` usando `@pinia/nuxt` ou composable reativo) e ícone no header.
4. Não há autenticação: considerar módulo OAuth ou JWT custom + middleware para rotas `/dashboard`.
5. SEO: adicionar meta específicas por página (produto, categoria) com `useHead`.
6. Acessibilidade: adicionar `aria-*` em botões/toggle tema e labels explícitos.
7. Loading states: inserir placeholders/skeletons enquanto `useFetch` carrega.
8. Erros: tratar falha em chamadas (try/catch + `showError` ou mensagens amigáveis).
9. Testes: incluir testes unitários (ex: vitest) para util de datas e componentes de formulário.
10. Build otimizações: adicionar `analyze: true` quando necessário e extrair variáveis repetidas (categorias) para fonte única.

## Próximos Passos Sugeridos

Prioridade Alta:
1. Implementar rotas de escrita (POST/PUT/DELETE) para produtos.
2. Adicionar estado global (Pinia) para produtos + carrinho.
3. Autenticação básica (login simples, proteção de dashboard).

Prioridade Média:
4. Skeletons e toasts de feedback (sucesso/erro) com componente dedicado.
5. Filtro e busca em `/dashboard/produtos`.
6. Paginação ou lazy load de produtos.

Prioridade Baixa:
7. Tema adicional (modo "místico" com gradientes) via variants CSS.
8. Internacionalização (pt / en) usando `@nuxtjs/i18n`.
9. Logs e analytics (plausible / simple custom events).

## Scripts Úteis (após instalar dependências)

Dev: `npm run dev`
Build: `npm run build`
Preview: `npm run preview`

## Como Evoluir a Persistência

1. Criar arquivo `server/api/products.post.ts` lendo body (`readBody`) e adicionando ao array (ideal: mover dados para um módulo em `server/` que mantenha estado ou utilizar banco real).
2. Criar `products/[id].put.ts` e `products/[id].delete.ts`.
3. Substituir mutações locais nos formulários por chamadas `await $fetch('/api/products', { method: 'POST', body })`.

## Segurança / Hardening

- Sanitizar entradas (zod já ajuda na validação, mas sanitização adicional pode ser aplicada).
- Limitar tamanho de campos (ex: descrição <= 1000 chars) já no schema.
- Considerar rate limiting futuro em rotas sensíveis.

## Checklist Rápido Antes de Produção

- [ ] Instalar e travar versões (`package-lock.json`)
- [ ] Adicionar favicon real e meta OG
- [ ] Configurar variáveis de ambiente (API_SECRET, etc.)
- [ ] Ativar compressão e headers de segurança (Nitro middleware ou proxy/CDN)
- [ ] Testar em dispositivos móveis reais

---
Arquivo gerado automaticamente para orientar próximos passos.