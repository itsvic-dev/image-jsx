import { renderToFile } from "../lib/index.js";
import { Rect, Text } from "../lib/2d/index.js";
import Layout from "../lib/2d/Layout.js";

const Image = () => (
  <Rect fill={"darkred"}>
    <Layout gap={8}>
      <Rect w={128} h={32} fill={"#00ff0080"} />
      <Rect w={64} h={32} fill={"#0000ff80"} />
      <Rect w={32} h={64} fill={"#ff00ff80"} />
    </Layout>
  </Rect>
);

renderToFile(648, 360, "example.png", <Image />);
