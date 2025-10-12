# Image.JSX

Image.JSX lets you create images by writing JSX code.

```jsx
import { renderToFile } from "image-jsx";
import { Rect, Text } from "image-jsx/2d";

const Image = () => (
  <Rect fill="aqua">
    <Text fill="black" fontFamily="Arial" fontSize={48}>
      hello world!
    </Text>
  </Rect>
);

renderToFile(640, 360, "hello.png", <Image />);
```

It is intended to be used standalone.
