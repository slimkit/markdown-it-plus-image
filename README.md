# markdown-it-plus-image

> ThnkSNS Plus image syntax plugin for markdown-it markdown parser.

**Required `markdown-it` >= `8.4`.**

Syntax is `@![title](id)` tag.

## Install

npm, yarn

```shell
npm install markdown-it-plus-image --save
yarn add markdown-it-plus-image
```

## Use

```js
import markdownIt from 'markdown-it';
import plusImageSyntax from 'markdown-it-plus-image';

const basename = 'https://plus.io/api/v2/files/';
const md = markdownIt()
    .use(plusImageSyntax, basename);

md.render(/* ... */);

```


## License

[Apache-2.0](LICENSE)