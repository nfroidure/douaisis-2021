import Layout from "../../layouts/main";
import ContentBlock from "../../components/contentBlock";
import Heading1 from "../../components/h1";
import Heading2 from "../../components/h2";
import Paragraph from "../../components/p";
import Anchor from "../../components/a";
import { reshapeIllustrations } from "../../utils/contentful";
import axios from "axios";
import { toASCIIString } from "../../utils/ascii";
import UnorderedList from "../../components/ul";
import ListItem from "../../components/li";
import { CSS_BREAKPOINT_START_L } from "../../utils/constants";

export type Article = {
  id: string;
  title: string;
  titreCourt: string;
  ordre: number;
  description: string;
  content: any;
  illustration: {
    href: string;
    alt: string;
  };
};

type Props = {
  articles: Article[];
};

const Page = ({ articles }: Props) => (
  <Layout
    title="Notre programme"
    description="Découvrez le programme de l'union des écologistes et de la gauche."
  >
    <ContentBlock>
      <Heading1>Notre programme</Heading1>
      <Paragraph>
        L’alternance espérée lors des élections départementales prochaines et le
        retour des progressistes et des écologistes à la tête du département du
        Nord vont permettre de rendre toute leur noblesse aux missions dévolues
        aux départements&nbsp;:
      </Paragraph>
      <UnorderedList>
        <ListItem>
          Aider et protéger les Nordistes à tous les âges de la vie
        </ListItem>
        <ListItem>Favoriser la réussite de tous nos enfants</ListItem>
        <ListItem>Retisser des liens pour un Nord actif et solidaire</ListItem>
        <ListItem>
          Adapter le Nord à la nécessaire transition écologique, économique et
          sociale
        </ListItem>
      </UnorderedList>
    </ContentBlock>
    <div className="article">
      {articles.map((article) => (
        <div className="article_item" key={article.id}>
          <Heading2>
            <Anchor href={`/programme/${article.id}`} className="no_underline">
              {article.titreCourt}
            </Anchor>
          </Heading2>
          <Paragraph className="photo">
            <Anchor href={`/programme/${article.id}`}>
              <img
                src={"https:" + article.illustration.href}
                alt={article.illustration.alt}
              />
            </Anchor>
          </Paragraph>
          <Paragraph>
            {article.title}{" "}
            <Anchor href={`/programme/${article.id}`}>Lire plus</Anchor>
          </Paragraph>
        </div>
      ))}
    </div>
    <ContentBlock>
      <Heading2>Les actualités de la campagne</Heading2>
      <Paragraph>
        Vous pouvez également suivre les nouvelles de la campagne{" "}
        <Anchor href={`/actualites`}>sur la page actualités</Anchor>.
      </Paragraph>
    </ContentBlock>
    <style jsx>{`
      :global(a.no_underline) {
        text-decoration: none;
      }
      .article_item {
        text-align: center;
        background: var(--light);
        margin: var(--vRythm) 0 0 0;
        padding: 0 var(--gutter);
      }
      .article_item img {
        max-width: 100%;
      }

      @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
        .article {
          display: flexbox;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: space-between;
          margin: var(--vRythm) 0;
        }
        .article_item {
          width: calc(50% - calc(var(--gutter) / 2));
        }
      }
    `}</style>
  </Layout>
);

export const getStaticProps = async () => {
  const response = await axios({
    method: "get",
    url: `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=article`,
    headers: {
      referer: "Web Site Syncer",
    },
    params: {
      access_token: process.env.CONTENTFUL_API_TOKEN,
    },
  });

  const articles = response.data.items
    .map((item: any) => ({
      id: toASCIIString(item.fields.title),
      title: item.fields.title,
      titreCourt: item.fields.titreCourt,
      ordre: item.fields.ordre,
      description: item.fields.description,
      content: item.fields.content,
      illustration: reshapeIllustrations(
        item.fields.illustration ? [item.fields.illustration] : [],
        response.data
      )[0],
    }))
    .sort(({ ordre: orderA }: any, { ordre: orderB }: any) =>
      orderA > orderB ? 1 : -1
    );

  return { props: { articles } as Props };
};

export default Page;
