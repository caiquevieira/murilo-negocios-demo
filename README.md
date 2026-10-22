# Murilo Negócios · TechShop

Vitrine premium de iPhones da loja física no Centro de Osasco. O objetivo é levar o cliente para o **WhatsApp**, o **Instagram** e a loja. Não é e-commerce.

> Exceção ao padrão do kit (`../CLAUDE.md`): este projeto usa Next.js (export estático), por decisão do operador.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera o site estático em out/ (subir o conteúdo de out/ na Hostinger)
npm run publicar:demo   # publica a demo (noindex) no GitHub Pages, branch gh-pages
```

Demo: https://caiquevieira.github.io/murilo-negocios-demo/

## Catálogo pela planilha (o Murilo edita sozinho)

O catálogo e a tabela do simulador de troca vêm de uma planilha do Google. O site lê a planilha no navegador a cada visita; o que o Murilo muda aparece em poucos minutos, sem build nem deploy.

- ID da planilha: `catalogSheetId` em `src/config/site.ts`. Vazio = usa `src/data/products.ts`.
- A planilha precisa estar em **Compartilhar › Qualquer pessoa com o link › Leitor** (só leitura; editar continua restrito).
- Abas lidas: `Catálogo` (colunas na ordem: Mostrar no site, Código, Modelo, Condição, Capacidade, Preço à vista, Preço "de", Cores, Foto, Selo, Frase, Bateria %) e `Troca` (Modelo, Código, Valor de entrada). Não renomear abas nem mudar a ordem das colunas.
- Linhas com o mesmo Código viram capacidades do mesmo aparelho. Código vazio = aparelho novo, com página em `/iphone/ver/?id=…`.
- Se a planilha falhar, o site usa a última versão salva no navegador e, sem ela, `products.ts`. Leitura e regras em `src/lib/catalog.ts` e `src/components/CatalogProvider.tsx`.
- Modelo da planilha gerado a partir do catálogo: `catalogo-murilo-negocios.xlsx` (abas Como usar, Catálogo, Fotos, Troca).

## Onde editar

| O quê | Arquivo |
|---|---|
| WhatsApp, endereço, links do Google (mapa e avaliação), horário, Instagram, IDs de GA4/Pixel, crédito | `src/config/site.ts` |
| Produtos, preços, cores, seminovos | Planilha do Google (reserva: `src/data/products.ts`) |
| Valores do simulador de troca | `src/data/tradein.ts` |
| Especificações do comparador (oficiais da Apple, XR ao Duo) | `src/data/iphones.ts` |
| Fotos do comparador (uma por modelo, `<id>.webp`) | `public/comparar/` |
| Logo (fundo transparente) | `public/marca/` |
| Mensagens prontas do WhatsApp | `src/lib/whatsapp.ts` |
| Cores, tipografia e botões (tokens) | `src/app/globals.css` |
| Fotos da loja | `public/store/` |

## Páginas

`/` home · `/iphone` vitrine com filtros · `/iphone/<id>` página de cada modelo · `/seminovos` · `/troca` (simulador; aceita `?modelo=<id>`) · `/comparar` (comparador; aceita `?de=<id>&para=<id>`) · `/loja`

## SEO e GEO

- Cada página tem título, descrição, URL canônica, Open Graph e Twitter Card (`src/lib/seo.ts`). Imagem de compartilhamento: `public/og/murilo-negocios.jpg` (1200x630).
- Dados estruturados (Schema.org): `MobilePhoneStore` e `WebSite` em todas as páginas (`layout.tsx`), `FAQPage` na home, `BreadcrumbList` e `Product` (preço e estoque vivos da planilha) nas páginas de produto.
- `sitemap.xml` e `robots.txt` gerados no build (`src/app/sitemap.ts`, `src/app/robots.ts`). Na demo, o robots bloqueia tudo.
- GEO (buscadores de IA): `public/llms.txt` com o resumo factual da loja e perguntas frequentes com respostas diretas (`src/components/sections/Faq.tsx`). Ao mudar endereço, horário ou pagamento, atualize também o `llms.txt`.
- O endereço público vem de `site.url` (ou `NEXT_PUBLIC_SITE_URL` no build). **Trocar `site.url` pelo domínio definitivo antes da entrega**, senão canônicas e sitemap apontam para o domínio provisório.

## Medição de conversão

Todo link de WhatsApp e Instagram passa pelo `LeadLink` (`src/components/ui/LeadLink.tsx`), com `data-track` e `data-origem` no padrão `_docs/padrao-whatsapp.md`:

| Canal | GA4 | Meta Pixel |
|---|---|---|
| `whatsapp` | `generate_lead` (`method`, `origem`, `item_name`, `value`) | `Contact` |
| `instagram` | `click_instagram` (`origem`) | — |
| `avaliacao` | `click_avaliacao` (`origem`) | — |
| `mapa` | `click_mapa` (`origem`) | — |

Os eventos também vão para o `dataLayer` (`track_whatsapp`, `track_instagram`...). Os scripts de GA4 e Pixel só carregam quando os IDs estão preenchidos em `site.ts`. Em desenvolvimento, cada clique aparece no console como `[track] canal ← origem`.

## Pendências antes de publicar

- [ ] **Preços dos seminovos** em `products.ts`: são EXEMPLOS, trocar pelo estoque real.
- [ ] **Tabela de troca** em `tradein.ts`: os valores são EXEMPLOS (inclusive XR, XS, SE, mini, 17e, linha 17/18 e Duo), confirmar com o Murilo.
- [ ] Domínio definitivo (`site.url`).
- [ ] IDs do GA4 e do Meta Pixel + banner de consentimento (Consent Mode v2).
- [ ] Foto original da equipe sem o texto por cima (hoje é um recorte do post).
- [ ] Autorização de uso das fotos (fase de contratação).
- Endereço completo publicado (Av. Hilário Pereira de Souza, 406), com mapa ligado à ficha do Google. Visitas continuam com horário agendado pelo WhatsApp.
- Todos os aparelhos da vitrine estão à pronta entrega (não há mais encomenda).
