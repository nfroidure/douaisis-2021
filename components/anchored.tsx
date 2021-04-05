import Link from "next/link";
import { publicRuntimeConfig } from "../utils/config";

const Anchored = ({
  children,
  id = "",
}: {
  children: React.ReactNode;
  id?: string;
}) => {
  return (
    <div className="root">
      {children}{" "}
      <small>
        <Link href={`#${id}`}>
          <a className="icon" id={id} title="Lien vers cette section">
            <span>🔗</span>
          </a>
        </Link>
      </small>
      <style jsx>{`
        small {
          font-weight: bold;
        }
        a.icon {
          display: none;
          width: var(--column);
          height: var(--vRythm);
          background: var(--tertiary);
          mask-repeat: no-repeat;
          mask-position: left center;
          mask-size: calc(var(--vRythm) * 1);
        }
        .root:hover a.icon {
          display: inline-block;
          mask-image: url("${publicRuntimeConfig.buildPrefix}/images/icons/link.svg");
        }
        a.icon:target {
          display: inline-block;
          mask-image: url("${publicRuntimeConfig.buildPrefix}/images/icons/target.svg");
        }
        a.icon span {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Anchored;
