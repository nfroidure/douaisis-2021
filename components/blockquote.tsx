const Blockquote = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.BlockquoteHTMLAttributes<HTMLElement>) => (
  <blockquote className="root" {...props}>
    {children}
    <style jsx>{`
      .root {
        font-size: var(--bigFontSize);
        line-height: var(--bigLineHeight);
        margin: 0 0 var(--vRythm) 0;
        padding: 0 0 0 var(--gutter);
        border-left: var(--border) solid var(--green2);
      }
    `}</style>
  </blockquote>
);

export default Blockquote;
