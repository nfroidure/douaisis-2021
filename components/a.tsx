import Link from "next/link";
import type { LinkProps } from "next/link";

const Anchor = ({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  locale,
  className,
  ...props
}: {
  children: React.ReactNode;
} & LinkProps &
  Exclude<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) => (
  <Link
    {...{
      href,
      as,
      replace,
      scroll,
      shallow,
      passHref,
      prefetch,
      locale,
    }}
  >
    <a className={`root${className ? " " + className : ""}`} {...props}>
      {children}
      <style jsx>{`
        a,
        a:visited {
          cursor: pointer;
          text-decoration: underline;
          color: var(--tertiary);
          line-height: var(--mediumLineHeight);
        }
        a:hover,
        a:focus {
          color: var(--tertiary);
        }
      `}</style>
    </a>
  </Link>
);

export default Anchor;
