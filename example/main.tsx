import { renderToFile } from "@lib";
import { Rect, Text } from "@lib/2d";

const Image = () => (
  <Rect fill={"darkred"}>
    <Text fontFamily="Arial" fontSize={48} fill="white">
      hello
    </Text>
  </Rect>
);

renderToFile(648, 360, "example.png", <Image />);
