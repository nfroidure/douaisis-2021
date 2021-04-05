import Layout from "../layouts/main";
import ContentBlock from "../components/contentBlock";
import Paragraph from "../components/p";
import Anchored from "../components/anchored";
import Heading1 from "../components/h1";
import Heading2 from "../components/h2";
import Strong from "../components/strong";
import { mapNodesToElements } from "../utils/contentful";
import { toASCIIString } from "../utils/ascii";
import axios from "axios";
import { fixText } from "../utils/text";
import { publicRuntimeConfig } from "../utils/config";

type Props = {
  questions: {
    id: string;
    order: number;
    question: string;
    answer: any;
  }[];
};

const Page = ({ questions }: Props) => (
  <Layout title="La FAQ"
  image={`${publicRuntimeConfig.buildPrefix}/images/la-faq.png`}>
    <ContentBlock>
      <Heading1>La FAQ</Heading1>
      <Paragraph>
        Durant la campagne, nous rencontrerons régulièrement des questions qui
        seront redondantes. Au lieu de répondre individuellement,{" "}
        <Strong>nous prendrons le temps de détailler nos réponses</Strong> et de
        les consigner ici afin d'ensuite partager un lien vers celles-ci à la
        suite des commentaires sur les réseaux sociaux.
      </Paragraph>
      <Paragraph>
        De cette manière, nous comptons illustrer notre approche bienveillante
        envers nos concitoyen·ne·s en menant{" "}
        <Strong>des réflexions construites et constructives</Strong>.
      </Paragraph>
      {questions.map(({ id, question, answer }) => (
        <div key={id}>
          <Heading2>
            <Anchored id={id}>{fixText(question)}</Anchored>
          </Heading2>
          <Paragraph>{mapNodesToElements(answer)}</Paragraph>
        </div>
      ))}
    </ContentBlock>
  </Layout>
);

export const getStaticProps = async () => {
  const response = await axios({
    method: "get",
    url: `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=faq`,
    headers: {
      referer: "Web Site Syncer",
    },
    params: {
      access_token: process.env.CONTENTFUL_API_TOKEN,
    },
  });
  const questions = response.data.items
    .map((item: any) => ({
      id: toASCIIString(item.fields.question),
      order: item.fields.order,
      question: item.fields.question,
      answer: item.fields.answer,
    }))
    .sort(({ order: orderA }: any, { order: orderB }: any) =>
      orderA > orderB ? 1 : -1
    );

  return { props: { questions } as Props };
};

export default Page;
