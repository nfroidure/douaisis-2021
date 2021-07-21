import Layout from "../../layouts/main";
import ContentBlock from "../../components/contentBlock";
import Heading1 from "../../components/h1";
import Paragraph from "../../components/p";
import Anchor from "../../components/a";
import Share from "../../components/share";
import { DOMAIN_NAME } from "../../utils/constants";
import { getStaticProps as baseGetStaticProps } from ".";
import { mapNodesToElements } from "../../utils/contentful";
import type { Article } from ".";
import type { GetStaticProps, GetStaticPaths } from "next";
import { fixText } from "../../utils/text";
import { publicRuntimeConfig } from "../../utils/config";

type Params = {
  id: string;
};
type Props = {
  article: Article;
};

const StaticPropsDetail = ({ article }: Props) => {
  return (
    <Layout
      title={`${fixText(article.title)}`}
      description={fixText(article.description)}
      image={"https:" + article.illustration.href}
    >
      <ContentBlock>
        <Heading1>{fixText(article.title)}</Heading1>
        <Paragraph className="photo">
          <img
            src={`${publicRuntimeConfig.buildPrefix}/${article.illustration.href}`}
            alt={article.illustration.alt}
          />
        </Paragraph>
        {mapNodesToElements(article.content)}
        <Share
          url={`https://${DOMAIN_NAME}/programme/${article.id}`}
          title={article.title}
        />
        <Paragraph>
          <Anchor href="/programme">Retour</Anchor>
        </Paragraph>
      </ContentBlock>
      <style jsx>{`
        :global(p.photo) {
          text-align: center;
        }
        img {
          width: 100%;
        }
      `}</style>
    </Layout>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const { props: baseProps } = await baseGetStaticProps();

  const paths = baseProps.articles.map((article) => ({
    params: { id: article.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { props: baseProps } = await baseGetStaticProps();

  return {
    props: {
      article: baseProps.articles.find(
        ({ id }) => id === (params || {}).id
      ) as Article,
    },
  };
};
