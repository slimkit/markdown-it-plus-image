import path from 'path';
import generate from 'markdown-it-testgen';
import markdownIt from 'markdown-it';
import image from '../';

const text = `

## Plus image
@![One](1)

## Empty plus image
@![One]()

## Image
![image](https://plus/image.png)

`;

const md = markdownIt().use(image, 'https://plus.io/');

console.log(
  md.render(text)
);

describe('Test Process plus images', () => {

  const md = markdownIt().use(image, 'https://plus.io');

  generate(path.join(__dirname, 'fixtures', 'image.txt'), md);
});
