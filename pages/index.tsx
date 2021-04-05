import Layout from "../layouts/main";
import ContentBlock from "../components/contentBlock";
import Heading1 from "../components/h1";
import Heading2 from "../components/h2";
import Paragraph from "../components/p";
import Strong from "../components/strong";
import Anchor from "../components/a";
import UnorderedList from "../components/ul";
import ListItem from "../components/li";
import { getStaticProps as baseGetStaticProps } from "./comite-soutien";
import {
  CSS_BREAKPOINT_START_L,
  ORGANISATION_CONTACT,
} from "../utils/constants";
import { publicRuntimeConfig } from "../utils/config";
import type { GetStaticProps } from "next";
import type { Props as SupportersProps } from "./comite-soutien";
import { useEffect, useState } from "react";
import { fixText } from "../utils/text";

const Page = ({ supporters }: SupportersProps) => {
  const [selectedSupporter, setSelectedSupporter] = useState(0);
  const [currentTimeout, setCurrentTimeout] =
    useState<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }
    setCurrentTimeout(
      setTimeout(() => {
        setSelectedSupporter((selectedSupporter + 1) % supporters.length);
      }, 5000)
    );
  }, [selectedSupporter]);

  return (
    <Layout title="Katia Bittner, Frédéric Chéreau, Auriane Ait Lasri, Jean-Luc Dellacherie">
      <ContentBlock>
        <Heading1>Nord en Commun</Heading1>
        <Paragraph className="photo">
          <img
            src={`${publicRuntimeConfig.buildPrefix}/images/candidat-es.png`}
          />
        </Paragraph>
        <Paragraph>
          Pour le canton de Douai qui regroupe les communes de Courchelettes,
          Cuincy, Douai, Esquerchin,{" "}
          <span className="nobr">Flers-en-Escrebieux</span>,{" "}
          <span className="nobr">Lambres-lez-Douai</span>,{" "}
          <span className="nobr">Lauwin-Planque</span>, l'union rassemble EÉLV,
          Génération⋅s, PCF et PS pour la campagne départementale 2021.
        </Paragraph>
        <Heading2>Merci !</Heading2>
        <Paragraph>
          Il s'en est fallu de peu&nbsp;! Quelques centaines de voix nous ont
          séparées de la victoire. Nous vous remercions pour votre
          confiance&nbsp;!
        </Paragraph>
        <Paragraph>
          Suite au soupçon de nombreuses irrégularités, nous avons déposé un{" "}
          <Anchor href="https://www.lobservateur.fr/a-ne-pas-louper/2021/07/03/departementales-canton-de-douai-frederic-chereau-depose-un-recours-au-tribunal/">
            recours auprès du tribunal administratif
          </Anchor>
          .
        </Paragraph>
        <Paragraph>
          Nous vous tiendrons informé⋅es de son issue.
        </Paragraph>
        <Heading2>Notre socle est commun</Heading2>
        <Paragraph>
          Nous partageons les mêmes valeurs autour de la solidarité, la défense
          de l’environnement, du service public, la démocratie de proximité et
          l’idéal républicain de liberté, d’égalité et de fraternité.
          <br />
          <Strong>Il est temps d’agir pour le Nord.</Strong> Nous partageons les
          mêmes urgences : accélérer la transition écologique, mieux protéger
          notre santé, préserver nos biens communs que sont l’eau, l’air, le
          climat, notre environnement et reprendre soin des plus fragiles.
        </Paragraph>
        <Heading2>L’avenir du Nord s’écrit aujourd’hui</Heading2>
        <Paragraph>
          Face à la crise sanitaire, économique et sociale, nous voulons
          construire un avenir plus serein pour les générations qui viennent.
          Dans le Nord, il nous faut rattraper les retards et les désengagements
          accumulés après 6 années de gestion de la droite. Il nous faut prendre
          le train du changement pour un Nord bienveillant, qui agit pour la
          jeunesse, qui accompagne les personnes âgées et handicapées, un Nord
          qui crée des emplois et favorise la vie associative, un Nord qui
          cultive ses atouts et prépare l’avenir.
        </Paragraph>
        <Paragraph>
          <Strong>
            Nous sommes rassemblés et nous partageons le même objectif :
            inscrire à nouveau le Département du Nord dans le camp du progrès.
          </Strong>
        </Paragraph>
        <Paragraph className="photo">
          <img src={`${publicRuntimeConfig.buildPrefix}/images/sign.svg`} />
        </Paragraph>
        <Heading2>Sur ce site</Heading2>
        <Paragraph>
          <Strong>Retrouvez&nbsp;:</Strong>
        </Paragraph>
        <UnorderedList>
          <ListItem>
            <Anchor href="/candidat-es">les candidat⋅es</Anchor> pour le canton
            de Douai,
          </ListItem>
          <ListItem>
            <Anchor href="/programme">les idées</Anchor> que nous défendons pour
            le département du Nord,
          </ListItem>
          <ListItem>
            <Anchor href="/comite-soutien">
              les personnes qui nous soutiennent
            </Anchor>{" "}
            dans cette démarche,
          </ListItem>
          <ListItem>
            des <Anchor href="/faq">réponses aux diverses questions</Anchor> qui
            nous serons posées durant la campagne.
          </ListItem>
        </UnorderedList>
        <Paragraph>
          N'hésitez pas également{" "}
          <Anchor
            href={`mailto:${ORGANISATION_CONTACT}`}
            title="Contacter l'équipe de campagne"
          >
            à nous contacter
          </Anchor>{" "}
          pour toute question.
        </Paragraph>
      </ContentBlock>
      <div className="soutiens">
        <Heading2 className="light">Nos soutiens&nbsp;!</Heading2>

        <div className="supporter" key={supporters[selectedSupporter].id}>
          <div className="content">
            <div className="photo">
              {supporters[selectedSupporter].photo?.href ? (
                <img
                  src={"https:" + supporters[selectedSupporter].photo.href}
                  alt={supporters[selectedSupporter].photo?.alt}
                />
              ) : null}
            </div>
            <div className="description">
              <p className="quote">
                {fixText(supporters[selectedSupporter].quote)}
              </p>
              <p>
                <span className="name">
                  {fixText(supporters[selectedSupporter].fullName)}
                </span>{" "}
                -{" "}
                <span className="role">
                  {fixText(supporters[selectedSupporter].role)}
                </span>{" "}
                -{" "}
                <span className="city">
                  {fixText(supporters[selectedSupporter].city)}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="buttons">
          {supporters.map((supporter, index) => (
            <div className="button" key={supporter.fullName}>
              <button
                className={index === selectedSupporter ? "selected" : ""}
                onClick={() => setSelectedSupporter(index)}
                title={`Voir le message de soutien de ${supporter.fullName}`}
              >
                {supporter.fullName}
              </button>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        :global(p.photo) {
          text-align: center;
        }
        :global(.light) {
          color: var(--light) !important;
          text-align: center !important;
        }
        img {
          width: 100%;
        }
        .nobr {
          white-space: nowrap;
        }
        .soutiens {
          background-color: var(--tertiary);
          color: var(--light);
          padding: 0 var(--gutter) 0 var(--gutter);
        }
        .supporter {
          min-height: calc(var(--vRythm) * 8);
          padding: var(--vRythm) 0;
        }
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-wrap: unset;
        }
        .role {
          font-style: italic;
        }
        .city {
          text-decoration: underline;
        }
        .quote {
          font-size: var(--bigFontSize);
          font-weight: bold;
        }
        .quote:before {
          content: "“";
        }
        .quote:after {
          content: "”";
        }
        .buttons {
          display: flex;
          flex-direction: row;
          padding: calc(var(--vRythm) / 2) var(--gutter);
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }
        .button {
          padding-right: var(--gutter);
        }
        button {
          display: inline-block;
          height: calc(var(--vRythm));
          width: calc(var(--vRythm));
          border-radius: calc(var(--vRythm));
          appearance: none;
          border: none;
          border: var(--border) solid var(--light);
          background-color: transparent;
          padding: 0;
          cursor: pointer;
          font-size: 0;
          outline: none;
        }
        button:focus {
          border: calc(var(--border) * 2) solid var(--light);
        }
        button.selected {
          background-color: var(--light);
        }

        @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
          .supporter {
            min-height: calc(var(--vRythm) * 8);
            padding: var(--vRythm) var(--gutter);
          }
          .content {
            flex-direction: row;
          }
          .photo {
            width: 30%;
          }
          .description {
            width: 70%;
            padding-left: var(--gutter);
          }
        }
      `}</style>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<SupportersProps> = async () => {
  return await baseGetStaticProps({ limit: 10, vipOnly: true });
};

export default Page;
