import Layout from "../../layouts/main";
import ContentBlock from "../../components/contentBlock";
import Heading1 from "../../components/h1";
import Heading2 from "../../components/h2";
import Paragraph from "../../components/p";
import Anchor from "../../components/a";
import { reshapeIllustrations } from "../../utils/contentful";
import axios from "axios";
import { toASCIIString } from "../../utils/ascii";
import { CSS_BREAKPOINT_START_L } from "../../utils/constants";

export type News = {
  id: string;
  date: string;
  title: string;
  description: string;
  content: any;
  author: string;
  illustration: {
    href: string;
    alt: string;
  };
};

type Props = {
  news: News[];
};

const Page = ({ news }: Props) => (
  <Layout
    title="Actualité de la campagne"
    description="Découvrez toute l'actualité de notre campagne"
  >
    <ContentBlock className="title">
      <Heading1 className="title">Actualités</Heading1>
      <Paragraph>
        Sur cette page, vous pourrez retrouver les diverses actualités de la
        campagne.
      </Paragraph>

      <div className="news">
        {news.map((aNews) => (
          <div className="news_item" key={aNews.id}>
            <Paragraph className="news_illustration">
              <Anchor href={`/actualites/${aNews.id}`}>
                <img
                  src={"http:" + aNews.illustration.href}
                  alt={aNews.illustration.alt}
                />
              </Anchor>
            </Paragraph>
            <Heading2 className="news_title">
              <Anchor href={`/actualites/${aNews.id}`} className="no_underline">
                {aNews.title}
              </Anchor>
            </Heading2>
            <Paragraph className="news_description">
              {aNews.description}{" "}
              <Anchor href={`/actualites/${aNews.id}`}>Lire la suite</Anchor>
            </Paragraph>
            <div className="clear"></div>
          </div>
        ))}
      </div>
    </ContentBlock>
    <style jsx>{`
      :global(.news_title) {
        margin-top: 0 !important;
      }
      :global(.news_title a) {
        text-decoration: none !important;
      }
      :global(.news_illustration) {
        margin: 0 !important;
      }
      :global(.news_description) {
        margin: 0 !important;
      }
      .news_item {
        padding: var(--vRythm) 0;
        border-bottom: var(--border) solid var(--dark);
      }
      .news_item:first-child {
        padding: 0 0 var(--vRythm) 0;
      }
      .news_item:last-child {
        border: none;
        padding: var(--vRythm) 0 0 0;
      }
      img {
        width: 100%;
      }

      @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
        img {
          float: left;
          width: var(--block);
          margin-right: var(--gutter);
        }
        .clear {
          clear: left;
        }
      }
    `}</style>
  </Layout>
);

export const getStaticProps = async () => {
  const response = await axios({
    method: "get",
    url: `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=news_campaign`,
    headers: {
      referer: "Web Site Syncer",
    },
    params: {
      access_token: process.env.CONTENTFUL_API_TOKEN,
    },
  });

  const news = response.data.items
    .map((item: any) => ({
      id: toASCIIString(item.fields.title),
      title: item.fields.title,
      date: item.fields.date,
      description: item.fields.description,
      author: item.fields.author || "",
      content: (item.fields.content ? [item.fields.content] : []).map(buildAssets.bind(null, response.data))[0],
      illustration: reshapeIllustrations(
        item.fields.illustration ? [item.fields.illustration] : [],
        response.data
      )[0],
    }))
    .sort(({ date: dateA }: any, { date: dateB }: any) =>
      new Date(dateA).getTime() > new Date(dateB).getTime() ? -1 : 1
    );

  return { props: { news } as Props };
};

export default Page;

export function buildAssets(
  contentfulData: any,
  { nodeType, ...props }: Record<string, any>
): any {
  return nodeType === "embedded-asset-block"
    ? {
        ...props,
        nodeType,
        illustration: reshapeIllustrations([props.data.target], contentfulData)[0],
      }
    : {
        ...props,
        nodeType,
        ...(props.content
          ? {
              content: props.content.map(
                buildAssets.bind(null, contentfulData)
              ),
            }
          : {}),
      };
}
