import { CSS_BREAKPOINT_START_L } from "../utils/constants";

export default function ContentBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <section className={`root${className ? " " + className : ""}`}>
      {children}
      <style jsx>{`
        .root {
          background-color: var(--light);
          padding: var(--vRythm) var(--gutter);
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
          .root {
            padding: var(--vRythm) calc(var(--gutter) * 2);
          }
        }
      `}</style>
    </section>
  );
}
