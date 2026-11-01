import katex from "katex";

interface MathFormulaProps {
  formula: string;
  display?: boolean;
  className?: string;
}

export default function MathFormula({
  formula,
  display = false,
  className = "",
}: MathFormulaProps) {
  const html = katex.renderToString(formula, {
    displayMode: display,
    throwOnError: false,
    strict: false,
  });

  if (display) {
    return (
      <div
        className={`my-3 overflow-x-auto py-2 text-center ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

