import Layout from "../layouts/main";
import ContentBlock from "../components/contentBlock";
import { readFileSync } from "fs";
import Heading1 from "../components/h1";
import Heading2 from "../components/h2";
import Paragraph from "../components/p";
import Strong from "../components/strong";
import Anchor from "../components/a";
import Anchored from "../components/anchored";
import { useContext } from "react";
import { GridContext } from "../contexts/grid";
import { CSS_BREAKPOINT_START_L } from "../utils/constants";
import { publicRuntimeConfig } from "../utils/config";

export type Props = {
  supporters: {
    id: string;
    fullName: string;
    city: string;
    citation: any;
    quote: string;
    role: string;
    photo: any;
    vip: boolean;
  }[];
};

const Page = ({ supporters }: Props) => {
  const { h, v } = useContext(GridContext);
  return (
    <Layout
      title="Le comité de soutien"
      image={`${publicRuntimeConfig.buildPrefix}/images/comite-soutien.png`}
    >
      <ContentBlock>
        <Heading1>Le comité de soutien</Heading1>
        <Paragraph>
          Pour soutenir nos candidat⋅es nous avons lancé un appel qui a obtenu
          le soutiende personnalités représentatives de la démographie du
          Douaisis&nbsp;! Vous pouvez nous soutenir aussi en{" "}
          <Anchor
            href="https://framaforms.org/comite-de-soutien-1616745660"
            target="_blank"
            title="Compléter le formulaire de signature"
          >
            signant notre appel
          </Anchor>{" "}
          pour un département éco-solidaire. Merci à{" "}
          <Anchor href="#nos_soutiens">nos signataires</Anchor> pour leur
          soutien.
        </Paragraph>
        <Heading2>
          <Anchored id="notre_appel">Notre appel</Anchored>
        </Heading2>
        <Paragraph>
          <Strong>
            Pour le retour de l’action sociale et climatique dans le Nord !
          </Strong>
        </Paragraph>
        <Paragraph>
          Depuis 2015, sous la conduite d’une droite décomplexée,{" "}
          <Strong>
            notre département a rompu avec ses responsabilités sociales
          </Strong>
          .
        </Paragraph>
        <Paragraph>
          Au nom d’une prétendue lutte contre « l’assistanat » il a désarmé
          systématiquement les services relevant de la solidarité et accompagné
          la dégradation des services publics de proximité, y compris au
          collège.
        </Paragraph>
        <Paragraph>
          Les conséquences de ces choix sont aggravées par les ravages présents
          et à venir d’une crise sanitaire qui frappe, en premier lieu, les
          couches populaires et la jeunesse.
        </Paragraph>
        <Paragraph>
          Avec le Département, la Région et l’Agglomération du Douaisis gérées
          par les mêmes forces, une politique comptable sélective a été menée,
          préférant soutenir des projets en contradiction avec ce qu’exige la
          prise en compte sérieuse des risques climatiques et d’effondrement de
          la biodiversité.
        </Paragraph>
        <Paragraph>
          Plus que jamais, nous pensons qu’il est urgent de co-construire et
          d’encourager l’arc humaniste et écologiste initié dans le Douaisis dès
          les élections municipales.
        </Paragraph>
        <Paragraph>
          <Strong>
            Notre département a besoin de réinvestir les thématiques
            quotidiennes essentielles dont il a la charge :
          </Strong>{" "}
          la solidarité avec les populations les plus fragiles, la prise en
          charge du handicap, l’accompagnement de nos aînés mais aussi de nos
          jeunes sur des thèmes aussi larges que la santé, le logement et
          l’autonomie. Des sujets qui nous sont chers et qui doivent être au
          cœur de la politique du département du Nord.
        </Paragraph>
        <Paragraph>
          Nos collèges enfin sont le lieu où se préparent les générations de
          demain. L’intervention du Département en soutien de l’Education
          nationale est déterminante à ce niveau de scolarité, parent pauvre du
          système scolaire français, où se cristallisent les inégalités
          sociales. La stimulation d’un environnement favorable à l’égalité des
          chances dans les collèges est un facteur essentiel dans la
          construction des adultes en devenir que sont les adolescent·e·s.
        </Paragraph>
        <Paragraph>
          Plus de solidarité et d’éducation aujourd’hui, c’est demain moins de
          chômage et de délinquance, des Nordistes en meilleure santé, une
          économie plus florissante et plus résiliente. Les politiques sociales
          ne sont pas une charge sur laquelle on doit économiser, mais un
          investissement pour l’avenir !
        </Paragraph>
        <Paragraph>
          C’est pourquoi nous saluons l’union de la gauche et des écologistes
          réalisée dans notre canton, comme dans la Région, pour que le Nord
          reprenne les couleurs de la solidarité et épouse les enjeux
          écologiques,{" "}
          <Strong>
            nous appelons à soutenir ses candidat·e·s dès le 13 juin
          </Strong>
          .
        </Paragraph>
        <Heading2>
          <Anchored id="nos_soutiens">Nos soutiens</Anchored>
        </Heading2>
        <div>
          {supporters.map((supporter) => (
            <div className="supporter" key={supporter.id}>
              <div className="content">
                <div className="photo">
                  {supporter.photo?.href ? (
                    <img
                      src={"https:" + supporter.photo.href}
                      alt={supporter.photo?.alt}
                      width={h * 4 * 4 * 2}
                      height={v * 3 * 3 * 2}
                    />
                  ) : null}
                </div>
                <div className="description">
                  <p className="quote">{supporter.quote}</p>
                  <p>
                    <span className="name">{supporter.fullName}</span>
                    {supporter.role ? (
                      <>
                        {" "}
                        - <span className="role">{supporter.role}</span>
                      </>
                    ) : null}
                    {supporter.city ? (
                      <>
                        {" "}
                        - <span className="city">{supporter.city}</span>
                      </>
                    ) : null}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Paragraph>
          <Anchor
            href="https://framaforms.org/comite-de-soutien-1616745660"
            target="_blank"
            title="Compléter le formulaire de signature"
          >
            Je signe l'appel
          </Anchor>{" "}
          pour un Nord écologique et solidaire&nbsp;!
        </Paragraph>
      </ContentBlock>
      <style jsx>{`
        .supporter {
          min-height: calc(var(--vRythm) * 8);
          border-bottom: var(--border) solid var(--primary);
          padding: var(--vRythm) 0;
        }
        .supporter:last-child {
          border: none;
        }
        .content {
          display: flex;
          flex-direction: column;
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
        @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
          .supporter {
            padding: var(--vRythm) var(--gutter);
          }
          .content {
            flex-direction: row;
            align-items: center;
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

export const getStaticProps = async () => {
  const supporters = JSON.parse(readFileSync("./data/supporters").toString());

  return { props: { supporters } as Props };
};

export default Page;
