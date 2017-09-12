import image from './image';

export default (md, url) => {
  md.inline.ruler.before('image', 'plus-image', image(url));
};
