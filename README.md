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

## Onde editar

| O quê | Arquivo |
|---|---|
| WhatsApp, endereço, horário, Instagram, IDs de GA4/Pixel, crédito | `src/config/site.ts` |
| Produtos, preços, cores, seminovos | `src/data/products.ts` |
| Tabela do simulador de troca e modelos para encomenda | `src/data/tradein.ts` |
| Mensagens prontas do WhatsApp | `src/lib/whatsapp.ts` |
| Cores, tipografia e botões (tokens) | `src/app/globals.css` |
| Fotos da loja | `public/store/` |

## Páginas

`/` home · `/iphone` vitrine com filtros · `/iphone/<id>` página de cada modelo · `/seminovos` · `/troca` (simulador) · `/encomenda` · `/loja`

## Medição de conversão

Todo link de WhatsApp e Instagram passa pelo `LeadLink` (`src/components/ui/LeadLink.tsx`), com `data-track` e `data-origem` no padrão `_docs/padrao-whatsapp.md`:

| Canal | GA4 | Meta Pixel |
|---|---|---|
| `whatsapp` | `generate_lead` (`method`, `origem`, `item_name`, `value`) | `Contact` |
| `instagram` | `click_instagram` (`origem`) | — |

Os eventos também vão para o `dataLayer` (`track_whatsapp`, `track_instagram`...). Os scripts de GA4 e Pixel só carregam quando os IDs estão preenchidos em `site.ts`. Em desenvolvimento, cada clique aparece no console como `[track] canal ← origem`.

## Pendências antes de publicar

- [ ] **Preços dos seminovos** em `products.ts`: são EXEMPLOS, trocar pelo estoque real.
- [ ] **Tabela de troca** em `tradein.ts`: os valores são EXEMPLOS, confirmar com o Murilo.
- [ ] Domínio definitivo (`site.url`).
- [ ] IDs do GA4 e do Meta Pixel + banner de consentimento (Consent Mode v2).
- [ ] Foto original da equipe sem o texto por cima (hoje é um recorte do post).
- [ ] Autorização de uso das fotos (fase de contratação).
- Endereço público só com a rua (segurança). Visitas apenas com horário agendado pelo WhatsApp, onde o endereço completo é enviado.
