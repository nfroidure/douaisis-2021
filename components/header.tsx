import Link from "next/link";
import { publicRuntimeConfig } from "../utils/config";

const Header = () => {
  return (
    <>
      <header>
        <Link href="/">
          <a>
            <span>Ensemble pour le Nord&nbsp;!</span>
          </a>
        </Link>
        <p>Élections Départementales des 20 &amp; 27 juin 2021 - Canton de Douai</p>
      </header>
      <style jsx>{`
        header {
          background-color: var(--light);
          padding: var(--vRythm) 0;
        }
        a {
          display: block;
          width: 100%;
          height: calc(var(--vRythm) * 4);
          color: var(--primary);
          text-decoration: none;
          font-size: var(--giantFontSize);
          line-height: var(--giantLineHeight);
          background: url("${publicRuntimeConfig.buildPrefix}/images/logo-nord-en-commun-douaisis.svg") center center;
          background-size: contain;
          background-repeat: no-repeat;
        }

        a span {
          display: none;
        }

        p {
          text-align: center;
          color: var(--quaternary);
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default Header;
