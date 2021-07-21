import Layout from "../layouts/main";
import ContentBlock from "../components/contentBlock";
import Paragraph from "../components/p";
import Anchored from "../components/anchored";
import Heading1 from "../components/h1";
import Heading2 from "../components/h2";
import Strong from "../components/strong";
import { mapNodesToElements } from "../utils/contentful";
import { readFileSync } from "fs";
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
  <Layout
    title="La FAQ"
    image={`${publicRuntimeConfig.buildPrefix}/images/la-faq.png`}
  >
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
  const questions = JSON.parse(readFileSync("./data/questions").toString());

  return { props: { questions } as Props };
};

export default Page;
