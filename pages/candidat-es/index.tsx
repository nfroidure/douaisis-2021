import Layout from "../../layouts/main";
import ContentBlock from "../../components/contentBlock";
import Heading1 from "../../components/h1";
import Heading2 from "../../components/h2";
import Paragraph from "../../components/p";
import Anchor from "../../components/a";
import { readFileSync } from "fs";
import { CSS_BREAKPOINT_START_L } from "../../utils/constants";
import Strong from "../../components/strong";
import { publicRuntimeConfig } from "../../utils/config";

export type Candidate = {
  id: string;
  fullName: string;
  metier: string;
  parti: string;
  mandat: string;
  bio: any;
  order: number;
  engagement: any;
  union: any;
  citation: any;
  type: string;
  photo: {
    href: string;
    alt: string;
  };
};

type Props = {
  candidates: Candidate[];
};

const Page = ({ candidates }: Props) => (
  <Layout
    title="Nos candidat⋅es"
    description="Découvrez les candidat⋅es de notre canton"
  >
    <ContentBlock className="title">
      <Heading1 className="title">
        Nos candidat⋅es
        <br />
        <span className="subtitle">Pour le canton de Douai</span>
      </Heading1>
    </ContentBlock>
    <div className="people">
      {candidates.map((candidate) => (
        <div className="people_item" key={candidate.id}>
          <Heading2>
            <Anchor
              href={`/candidat-es/${candidate.id}`}
              className="no_underline"
            >
              {candidate.fullName}
            </Anchor>
          </Heading2>
          <Paragraph className="photo">
            <Anchor href={`/candidat-es/${candidate.id}`}>
              <img
                src={`${publicRuntimeConfig.buildPrefix}/${candidate.photo.href}`}
                alt={candidate.photo.alt}
                width={167}
                height={250}
              />
            </Anchor>
          </Paragraph>
          <Paragraph>
            <Strong>{candidate.type}</Strong>
          </Paragraph>
          <Paragraph>
            {candidate.citation}{" "}
            <Anchor href={`/candidat-es/${candidate.id}`}>Lire plus</Anchor>
          </Paragraph>
        </div>
      ))}
    </div>
    <style jsx>{`
      :global(.title) {
        margin-bottom: 0 !important;
      }
      :global(a.no_underline) {
        text-decoration: none;
      }
      .subtitle {
        font-variant: small-caps;
        color: var(--grey);
        font-size: var(--greatFontSize);
      }
      .people_item {
        text-align: center;
        background: var(--light);
        margin: var(--vRythm) 0 0 0;
        padding: 0 var(--gutter);
      }

      @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
        .people {
          display: flexbox;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: space-between;
          margin: var(--vRythm) 0;
        }
        .people_item {
          text-align: center;
          background: var(--light);
          width: calc(calc(calc(100% - var(--gutter)) / 2));
          margin: var(--vRythm) 0 0 0;
          padding: 0 var(--gutter);
        }
      }
    `}</style>
  </Layout>
);

export const getStaticProps = async () => {
  const candidates = JSON.parse(readFileSync("./data/candidates").toString());

  return { props: { candidates } as Props };
};

export default Page;
