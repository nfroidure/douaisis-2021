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
import Strong from "../../components/strong";

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
                src={"https:" + candidate.photo.href}
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
  const response = await axios({
    method: "get",
    url: `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=candidates`,
    headers: {
      referer: "Web Site Syncer",
    },
    params: {
      access_token: process.env.CONTENTFUL_API_TOKEN,
    },
  });
  const candidates = response.data.items
    .map((item: any) => ({
      id: toASCIIString(item.fields.fullName),
      fullName: item.fields.fullName,
      metier: item.fields.metier,
      parti: item.fields.parti,
      mandat: item.fields.mandat || "",
      bio: item.fields.bio,
      order: item.fields.order,
      engagement: item.fields.engagement,
      union: item.fields.union,
      citation: item.fields.citation,
      type: item.fields.type,
      photo: reshapeIllustrations(
        item.fields.photo ? [item.fields.photo] : [],
        response.data
      )[0],
    }))
    .sort(({ order: orderA }: any, { order: orderB }: any) =>
      orderA > orderB ? 1 : -1
    );

  return { props: { candidates } as Props };
};

export default Page;
