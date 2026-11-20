// OCaml and Rust grammars from PrismJS 1.20.0 (MIT, https://github.com/PrismJS/prism),
// the version the posts were first published with. Later Prism releases rewrote these
// two grammars, which recolors most OCaml and Rust code blocks; registering the old
// definitions keeps the highlighting exactly as it was while the rest of Prism updates.
// Aliases are arrays because gatsby-remark-prismjs turns plain strings into RegExps.

const ocaml = {
  comment: /\(\*[\s\S]*?\*\)/,
  string: [
    {
      pattern: /"(?:\\.|[^\\\r\n"])*"/,
      greedy: true,
    },
    {
      pattern: /(['`])(?:\\(?:\d+|x[\da-f]+|.)|(?!\1)[^\\\r\n])\1/i,
      greedy: true,
    },
  ],
  number: /\b(?:0x[\da-f][\da-f_]+|(?:0[bo])?\d[\d_]*\.?[\d_]*(?:e[+-]?[\d_]+)?)/i,
  directive: {
    pattern: /\B#\w+/,
    alias: [`important`],
  },
  label: {
    pattern: /\B~\w+/,
    alias: [`function`],
  },
  type_variable: {
    pattern: /\B'\w+/,
    alias: [`function`],
  },
  variant: {
    pattern: /`\w+/,
    alias: [`variable`],
  },
  module: {
    pattern: /\b[A-Z]\w+/,
    alias: [`variable`],
  },
  keyword: /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|nonrec|object|of|open|private|rec|sig|struct|then|to|try|type|val|value|virtual|when|where|while|with)\b/,
  boolean: /\b(?:false|true)\b/,
  operator: /:=|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lsl|lsr|lxor|mod|or)\b/,
  punctuation: /[(){}\[\]|_.,:;]/,
}

const rust = {
  comment: [
    {
      pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
      lookbehind: true,
    },
    {
      pattern: /(^|[^\\:])\/\/.*/,
      lookbehind: true,
    },
  ],
  string: [
    {
      pattern: /b?r(#*)"(?:\\.|(?!"\1)[^\\\r\n])*"\1/,
      greedy: true,
    },
    {
      pattern: /b?"(?:\\.|[^\\\r\n"])*"/,
      greedy: true,
    },
  ],
  char: {
    pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u{(?:[\da-fA-F]_*){1,6}|.)|[^\\\r\n\t'])'/,
    alias: [`string`],
  },
  "lifetime-annotation": {
    pattern: /'[^\s>']+/,
    alias: [`symbol`],
  },
  keyword: /\b(?:abstract|alignof|as|async|await|be|box|break|const|continue|crate|do|dyn|else|enum|extern|false|final|fn|for|if|impl|in|let|loop|match|mod|move|mut|offsetof|once|override|priv|pub|pure|ref|return|sizeof|static|self|Self|struct|super|true|trait|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
  attribute: {
    pattern: /#!?\[.+?\]/,
    greedy: true,
    alias: [`attr-name`],
  },
  function: [
    /\w+(?=\s*\()/,
    // Macros can use parens or brackets
    /\w+!(?=\s*\(|\[)/,
  ],
  "macro-rules": {
    pattern: /\w+!/,
    alias: [`function`],
  },
  // Hex, oct, bin, dec numbers with visual separators and type suffix
  number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:[iu](?:8|16|32|64)?|f32|f64))?\b/,
  // Closure params should not be confused with bitwise OR |
  "closure-params": {
    pattern: /\|[^|]*\|(?=\s*[{-])/,
    inside: {
      punctuation: /[|:,]/,
      operator: /[&*]/,
    },
  },
  punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
  operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/,
}

module.exports = [
  { language: `ocaml`, definition: ocaml },
  { language: `rust`, definition: rust },
  // Prism 1.25 started coloring object keys (`literal-property`). Replacing it in the
  // JavaScript grammar with a pattern that never matches keeps keys uncolored as in 1.20;
  // JSX is built from this grammar when first used, so it inherits the change.
  {
    extend: `javascript`,
    insertBefore: { "literal-property": { "literal-property": /(?!)/ } },
  },
]
