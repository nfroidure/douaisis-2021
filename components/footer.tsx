import Link from "next/link";
import Social from "./social";
import { publicRuntimeConfig } from "../utils/config";
import {
  CSS_BREAKPOINT_END_M,
  CSS_BREAKPOINT_END_S,
  CSS_BREAKPOINT_START_L,
  CSS_BREAKPOINT_START_M,
  ORGANISATION_NAME,
} from "../utils/constants";

const Footer = () => {
  return (
    <div className="root">
      <footer>
        <ul>
          <li>
            <a
              href="https://eelv-douaisis.fr"
              title="Visiter le site d'Europe Écologie-Les Verts"
            >
              <img
                src={`${publicRuntimeConfig.buildPrefix}/images/logo-eelv.svg`}
                alt="Logo Europe Écologie - Les Verts (EÉLV)"
                width={150}
                height={150}
              />
            </a>
          </li>
          <li>
            <a
              href="https://generation-s.fr"
              title="Visiter le site de Génération⋅s"
            >
              <img
                src={`${publicRuntimeConfig.buildPrefix}/images/logo-generation-s.svg`}
                alt="Logo Génération⋅s"
                width={150}
                height={150}
              />
            </a>
          </li>
          <li>
            <a
              href="https://pcf.fr"
              title="Visiter le site du Parti Communiste Français"
            >
              <img
                src={`${publicRuntimeConfig.buildPrefix}/images/logo-pcf.svg`}
                alt="Logo PCF"
                width={150}
                height={150}
              />
            </a>
          </li>
          <li>
            <a
              href="https://nord-en-commun.fr/"
              title="Visiter le site du Nord en Commun"
            >
              <img
                src={`${publicRuntimeConfig.buildPrefix}/images/logo-nord-en-commun.svg`}
                alt="Logo Nord en Commun"
                width={150}
                height={150}
              />
            </a>
          </li>
          <li>
            <a
              href="https://parti-socialiste.fr"
              title="Visiter le site du Parti Socialiste"
            >
              <img
                src={`${publicRuntimeConfig.buildPrefix}/images/logo-parti-socialiste.svg`}
                alt="Logo PS"
                width={150}
                height={150}
              />
            </a>
          </li>
        </ul>
        <div className="bottom">
          <p>
            <span>© {ORGANISATION_NAME} - Tous droits réservés</span> -{" "}
            <Link href="/mentions-legales">
              <a>Mentions légales</a>
            </Link>
          </p>
          <Social />
        </div>
      </footer>
      <style jsx>{`
        .root {
          margin: var(--vRythm) 0 0 0;
          background-color: var(--tertiary);
          padding: 0 var(--gutter) var(--vRythm) var(--gutter);
          color: var(--light);
        }

        footer {
          margin: 0 auto;
          text-align: center;
        }
        ul,
        li {
          list-style-type: none;
        }
        ul {
          display: flex;
          margin: 0;
          padding: 0;
          flex-direction: column;
          justify-content: center;
        }
        li {
          margin: 0;
          padding: 0;
          align-self: center;
        }
        p {
          margin: var(--vRythm) 0 0 0;
        }
        a,
        a:visited,
        a:hover {
          color: var(--light);
        }
        @media screen and (max-width: ${CSS_BREAKPOINT_END_S}) {
          footer {
            width: 100%;
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_M}) and (max-width: ${CSS_BREAKPOINT_END_M}) {
          footer {
            width: calc(calc(var(--block) * 2) + calc(var(--gutter) * 3));
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
          footer {
            width: calc(calc(var(--block) * 3) + calc(var(--gutter) * 4));
          }
          ul {
            flex-direction: row;
          }
          li:not(:last-child) {
            margin: 0 var(--column) 0 0;
          }
          .bottom {
            display: flex;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Footer;
