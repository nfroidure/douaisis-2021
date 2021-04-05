import Layout from "../../layouts/main";
import ContentBlock from "../../components/contentBlock";
import Heading1 from "../../components/h1";
import Paragraph from "../../components/p";
import Anchor from "../../components/a";
import Share from "../../components/share";
import { DOMAIN_NAME } from "../../utils/constants";
import { getStaticProps as baseGetStaticProps } from ".";
import { mapNodesToElements } from "../../utils/contentful";
import type { News } from ".";
import type { GetStaticProps, GetStaticPaths } from "next";
import { fixText } from "../../utils/text";

type Params = {
  id: string;
};
type Props = {
  aNews: News;
};

const StaticPropsDetail = ({ aNews }: Props) => {
  return (
    <Layout
      title={`${fixText(aNews.title)}`}
      description={fixText(aNews.description)}
      image={"https:" + aNews.illustration.href}
    >
      <ContentBlock>
        <Heading1>{fixText(aNews.title)}</Heading1>
        {/**
           * 
           <Paragraph>
             {aNews.author ? `Par ${aNews.author} le ` : `Le `}
             {new Date(aNews.date).toLocaleDateString()}
           </Paragraph>
           * 
           */}
        {/**<Paragraph className="illustration">
          <img
            src={"https:" + aNews.illustration.href}
            alt={aNews.illustration.alt}
          />
        </Paragraph>*/}
        {mapNodesToElements(aNews.content)}
        <div className="clear"></div>
        <Share
          url={`https://${DOMAIN_NAME}/programme/${aNews.id}`}
          title={aNews.title}
        />
        <Paragraph>
          <Anchor href="/actualites">Retour</Anchor>
        </Paragraph>
      </ContentBlock>
      <style jsx>{`
        :global(p.illustration) {
          float: left;
          width: var(--block);
          margin: 0 var(--gutter) 0 0;
        }
        img {
          width: 100%;
          margin: 0;
        }
        .clear {
          clear: both;
        }
      `}</style>
    </Layout>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const { props: baseProps } = await baseGetStaticProps();

  const paths = baseProps.news.map((aNews) => ({
    params: { id: aNews.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { props: baseProps } = await baseGetStaticProps();

  return {
    props: {
      aNews: baseProps.news.find(({ id }) => id === (params || {}).id) as News,
    },
  };
};
