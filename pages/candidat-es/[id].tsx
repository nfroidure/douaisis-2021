import Layout from "../../layouts/main";
import ContentBlock from "../../components/contentBlock";
import Heading1 from "../../components/h1";
import Heading2 from "../../components/h2";
import Paragraph from "../../components/p";
import Strong from "../../components/strong";
import Anchor from "../../components/a";
import { getStaticProps as baseGetStaticProps } from ".";
import { mapNodesToElements } from "../../utils/contentful";
import { publicRuntimeConfig } from "../../utils/config";
import type { Candidate } from ".";
import type { GetStaticProps, GetStaticPaths } from "next";

type Params = {
  id: string;
};
type Props = {
  candidate: Candidate;
};

const StaticPropsDetail = ({ candidate }: Props) => {
  return (
    <Layout
      title={`${candidate.fullName}`}
      description={`Présentation de ${candidate.fullName}`}
      image={`${publicRuntimeConfig.buildPrefix}/images/${candidate.id}.png`}
    >
      <ContentBlock>
        <Heading1>{candidate.fullName}</Heading1>
        <Heading2>{candidate.type}</Heading2>
        <Paragraph>
          <Strong>Profession&nbsp;:</Strong> {candidate.metier}
          <br />
          <Strong>Sensibilité&nbsp;:</Strong> {candidate.parti}
          <br />
          {candidate.mandat ? (
            <>
              <Strong>Mandats&nbsp;:</Strong> {candidate.mandat}
              <br />
            </>
          ) : null}
        </Paragraph>
        <Paragraph className="photo">
          <img
            src={`${publicRuntimeConfig.buildPrefix}/${candidate.photo.href}`}
            alt={candidate.photo.alt}
            width={167}
            height={250}
          />
        </Paragraph>
        <Heading2>Qui suis-je&nbsp;?</Heading2>
        <Paragraph>{mapNodesToElements(candidate.bio)}</Paragraph>
        <Heading2>Pourquoi je me présente&nbsp;?</Heading2>
        <Paragraph>{mapNodesToElements(candidate.engagement)}</Paragraph>
        <Heading2>Pourquoi l'union&nbsp;?</Heading2>
        <Paragraph>{mapNodesToElements(candidate.union)}</Paragraph>
        <Paragraph>
          <Anchor href="/candidat-es">Retour</Anchor>
        </Paragraph>
      </ContentBlock>
      <style jsx>{`
        :global(p.photo) {
          float: left;
          width: var(--block);
          text-align: center;
          margin: 0 var(--gutter) 0 0;
        }
      `}</style>
    </Layout>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const { props: baseProps } = await baseGetStaticProps();

  const paths = baseProps.candidates.map((candidate) => ({
    params: { id: candidate.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { props: baseProps } = await baseGetStaticProps();

  return {
    props: {
      candidate: baseProps.candidates.find(
        ({ id }) => id === (params || {}).id
      ) as Candidate,
    },
  };
};
