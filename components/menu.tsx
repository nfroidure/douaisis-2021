import Link from "next/link";
import { useRouter } from "next/router";
import { publicRuntimeConfig } from "../utils/config";
import {
  CSS_BREAKPOINT_END_M,
  CSS_BREAKPOINT_END_S,
  CSS_BREAKPOINT_START_L,
  CSS_BREAKPOINT_START_M,
} from "../utils/constants";

const Menu = () => {
  const router = useRouter();

  return (
    <div className="root">
      <nav>
        <Link href="/">
          <a
            className={router.pathname === "/" ? "selected" : ""}
            title="Revenir à l'accueil"
          >
            <span>Accueil</span>
          </a>
        </Link>
        <Link href="/candidat-es">
          <a
            className={router.pathname === "/candidat-es" ? "selected" : ""}
            title="Découvrir nos candidat⋅es"
          >
            <span>Candidat⋅es</span>
          </a>
        </Link>
        <Link href="/programme">
          <a
            className={router.pathname === "/programme" ? "selected" : ""}
            title="Lire nos propositions pour le Nord"
          >
            <span>Programme</span>
          </a>
        </Link>
        <Link href="/comite-soutien">
          <a
            className={router.pathname === "/comite-soutien" ? "selected" : ""}
            title="Lire notre appel et découvrir le comité"
          >
            <span>Comité de soutien</span>
          </a>
        </Link>
        <Link href="/faq">
          <a
            className={router.pathname === "/faq" ? "selected" : ""}
            title="Lire nos questions/réponses"
          >
            <span>FAQ</span>
          </a>
        </Link>
        <a
          className="newsletter"
          href="https://oz128vdb97u.typeform.com/to/c4mjue0Y"
          target="_blank"
          title="S'abonner à la lettre d'information"
        >
          <span>S'abonner</span>
        </a>
      </nav>
      <style jsx>{`
        .root {
          background-color: var(--tertiary);
          margin: 0 0 calc(var(--vRythm) * 2) 0;
        }
        nav {
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }
        nav a,
        nav a:visited {
          display: block;
          color: var(--light);
          font-size: var(--bigFontSize);
          line-height: var(--bigLineHeight);
          text-decoration: none;
          transition: background-color var(--baseAnimationRate),
            color var(--baseAnimationRate);
        }
        nav a:hover {
          color: var(--tertiary);
          background-color: var(--light);
          text-decoration: underline;
        }
        nav a.selected {
          text-decoration: underline;
        }
        nav a.newsletter {
          background-color: var(--quaternary);
          color: var(--light);
        }
        nav span {
          display: block;
          padding: calc(var(--vRythm) / 2) var(--gutter);
        }
        @media screen and (max-width: ${CSS_BREAKPOINT_END_S}) {
          nav {
            width: 100%;
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_M}) and (max-width: ${CSS_BREAKPOINT_END_M}) {
          nav {
            width: calc(calc(var(--block) * 2) + calc(var(--gutter) * 3));
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
          nav {
            flex-direction: row;
            width: calc(calc(var(--block) * 3) + calc(var(--gutter) * 4));
          }
          .newsletter span {
            width: calc(var(--vRythm));
            background: var(--light);
            mask-repeat: no-repeat;
            mask-position: center center;
            mask-size: calc(var(--vRythm));
            mask-image: url("${publicRuntimeConfig.buildPrefix}/images/icons/mail.svg");
          }
        }
      `}</style>
    </div>
  );
};

export default Menu;
