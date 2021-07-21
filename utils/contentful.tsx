import Anchor from "../components/a";
import Blockquote from "../components/blockquote";
import Heading1 from "../components/h1";
import Heading2 from "../components/h2";
import Heading3 from "../components/h3";
import Heading4 from "../components/h4";
import Heading5 from "../components/h5";
import Heading6 from "../components/h6";
import HorizontalRule from "../components/hr";
import ListItem from "../components/li";
import OrderedList from "../components/ol";
import Paragraph from "../components/p";
import UnorderedList from "../components/ul";
import Strong from "../components/strong";
import Emphasis from "../components/em";
import Cite from "../components/cite";
import { publicRuntimeConfig } from "../utils/config";
import { fixText } from "./text";

type ElementMap = (
  data: {
    content: any;
    value?: any;
    data?: any;
    marks?: any;
    illustration?: any;
    contentfulData?: any;
  },
  index?: number
) => React.ReactNode;

const paragraphMap: ElementMap = ({ content }, index) => (
  <Paragraph key={index}>{content.map(mapNodesToElements)}</Paragraph>
);
const heading1Map: ElementMap = ({ content }, index) => (
  <Heading1 key={index}>{content.map(mapNodesToElements)}</Heading1>
);
const heading2Map: ElementMap = ({ content }, index) => (
  <Heading2 key={index}>{content.map(mapNodesToElements)}</Heading2>
);
const heading3Map: ElementMap = ({ content }, index) => (
  <Heading3 key={index}>{content.map(mapNodesToElements)}</Heading3>
);
const heading4Map: ElementMap = ({ content }, index) => (
  <Heading4 key={index}>{content.map(mapNodesToElements)}</Heading4>
);
const heading5Map: ElementMap = ({ content }, index) => (
  <Heading5 key={index}>{content.map(mapNodesToElements)}</Heading5>
);
const heading6Map: ElementMap = ({ content }, index) => (
  <Heading6 key={index}>{content.map(mapNodesToElements)}</Heading6>
);
const olMap: ElementMap = ({ content }, index) => (
  <OrderedList key={index}>{content.map(mapNodesToElements)}</OrderedList>
);
const ulMap: ElementMap = ({ content }, index) => (
  <UnorderedList key={index}>{content.map(mapNodesToElements)}</UnorderedList>
);
const liMap: ElementMap = ({ content }, index) => (
  <ListItem key={index}>{content.map(mapNodesToElements)}</ListItem>
);
const hrMap: ElementMap = (_, index) => <HorizontalRule key={index} />;
const embeddedAssetMap: ElementMap = ({ illustration }, index) => {
  return (
    <Paragraph key={index}>
      <img
        src={`${publicRuntimeConfig.buildPrefix}/${illustration.href}`}
        alt={illustration.alt}
      />
      <style jsx>{`
        img {
          clear: both;
          display: block;
          width: 100%;
        }
      `}</style>
    </Paragraph>
  );
};
const blockquoteMap: ElementMap = ({ content }, index) => (
  <Blockquote key={index}>{content.map(mapNodesToElements)}</Blockquote>
);
const hyperlinkMap: ElementMap = ({ content, data }, index) =>
  (data?.uri || "").startsWith("https://www.youtube.com/watch") ? (
    <span className="root" key={index}>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${data.uri.replace(
          "^.*v=([^&$]+).*$",
          "$1"
        )}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <style jsx>{`
        .root {
          display: block;
          overflow: hidden;
          padding-bottom: 56.25%;
          position: relative;
          height: 0;
        }

        .root iframe {
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          position: absolute;
        }
      `}</style>
    </span>
  ) : (
    <Anchor href={data?.uri} key={index}>
      {content.map(mapNodesToElements)}
    </Anchor>
  );
const textMap: ElementMap = ({ value, marks }, index) =>
  marks?.[0]?.type === "underline" ? (
    <Cite key={index}>{fixText(value)}</Cite>
  ) : marks?.[0]?.type === "italic" ? (
    <Emphasis key={index}>{fixText(value)}</Emphasis>
  ) : marks?.[0]?.type === "bold" ? (
    <Strong key={index}>{fixText(value)}</Strong>
  ) : (
    <span key={index}>{fixText(value)}</span>
  );

const elementsMapping: Record<string, ElementMap> = {
  document: (({ content }) => content.map(mapNodesToElements)) as ElementMap,
  paragraph: paragraphMap,
  "heading-1": heading1Map,
  "heading-2": heading2Map,
  "heading-3": heading3Map,
  "heading-4": heading4Map,
  "heading-5": heading5Map,
  "heading-6": heading6Map,
  "unordered-list": ulMap,
  "ordered-list": olMap,
  "list-item": liMap,
  "embedded-asset-block": embeddedAssetMap,
  hyperlink: hyperlinkMap,
  blockquote: blockquoteMap,
  hr: hrMap,
  text: textMap,
} as const;

export function mapNodesToElements(
  {
    nodeType,
    ...props
  }: { nodeType: keyof typeof elementsMapping } & Record<string, any>,
  index = 0
) {
  return elementsMapping[nodeType]
    ? elementsMapping[nodeType](props as any, index)
    : "";
}

export function reshapeIllustrations(illustrations: any, contentfulData: any) {
  return illustrations
    .filter((illustration: any) => illustration.sys.type === "Link")
    .map((illustration: any) => {
      const asset = (contentfulData?.includes?.Asset || []).find(
        (asset: any) => asset.sys.id === illustration.sys.id
      );

      return {
        href: asset?.fields?.file?.url,
        alt: asset?.fields?.title,
      };
    });
}
