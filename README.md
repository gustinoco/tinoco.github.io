# Site pessoal de Gustavo Tinoco

Site estático em HTML, CSS e JavaScript, preparado para https://tinoco.dev/.

## SEO

- `index.html`: título, descrição, URL canônica e dados estruturados JSON-LD de `ProfilePage` e `Person`, com os perfis do LinkedIn e GitHub.
- `robots.txt`: permite o rastreamento e informa o endereço do sitemap.
- `sitemap.xml`: lista a página principal. As seções com âncoras pertencem à mesma página.

Ao alterar o conteúdo da página, atualize `lastmod` no sitemap com a data real da alteração. Se o domínio mudar, atualize também a URL canônica, os metadados sociais, os dados estruturados e os endereços em `robots.txt` e `sitemap.xml`.

## Após publicar

1. Confirme que `https://tinoco.dev/`, `https://tinoco.dev/robots.txt` e `https://tinoco.dev/sitemap.xml` respondem com HTTP 200.
2. Adicione a propriedade de domínio `tinoco.dev` no [Google Search Console](https://search.google.com/search-console/) e conclua a verificação de propriedade usando o registro DNS fornecido pelo Google, caso ainda não esteja verificada.
3. No relatório de sitemaps, envie `https://tinoco.dev/sitemap.xml`.
4. Na inspeção de URL, informe `https://tinoco.dev/`, execute o teste da URL publicada e solicite indexação.
5. Acompanhe indexação, impressões, cliques e consultas no Search Console.

Os arquivos locais não enviam solicitações ao Google. A verificação de propriedade e o envio no Search Console precisam ser feitos com uma conta autorizada. Indexação e posição nos resultados não são garantidas.
