import { renderToFile } from "image-jsx";
import { Rect, Text } from "image-jsx/2d";

const Image = () => (
  <Rect fill="red">
    <Text fill="white" fontFamily="Arial" fontSize={48}>
      hello, world!
    </Text>
  </Rect>
);

renderToFile(640, 360, "hello-world.png", <Image />);
