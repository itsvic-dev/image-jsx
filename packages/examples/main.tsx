import { renderToFile } from "image-jsx";
import { Layout, Rect, Text } from "image-jsx/2d";

const i18nKeys = {
  en: {
    hello: "hello, world!",
  },
  pl: {
    hello: "witaj, świecie!",
  },
};

const i18n = (
  lng: keyof typeof i18nKeys,
  key: keyof (typeof i18nKeys)["en"]
) => {
  const keys = i18nKeys[lng];
  if (!(key in keys)) {
    if (lng == "en") return key;
    return i18n("en", key);
  }
  return keys[key];
};

const Image = ({ lng }: { lng: keyof typeof i18nKeys }) => (
  <Rect fill="#10101b" w={1280} h={720}>
    <Rect fill="#16162a">
      <Layout w={640} h={720} arrangement="middle" alignment="middle" gap={32}>
        <Text
          fill="white"
          fontFamily="SF Pro Display"
          fontSize={48}
          fontWeight={700}
        >
          {i18n(lng, "hello")}
        </Text>
        <Rect fill="white" w={32} h={32} radius={16}></Rect>
      </Layout>
    </Rect>
  </Rect>
);

for (const lng of ["en", "pl"] as const) {
  renderToFile(1280, 720, `hello-${lng}.png`, <Image lng={lng} />);
}
