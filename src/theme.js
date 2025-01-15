const theme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading:
      '"Titan One",system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 300,
    heading: 500,
    bold: 500,
  },
  lineHeights: {
    body: 1.4,
    heading: 1.3,
  },
  colors: {
    text: "#FFF",
    accent: "#FBC02D",
    background: "#3336FF",
    primary: "#3C3FFF",
    secondary: "#F5F5FF",
    muted: "#F2F2F2",
  },
  text: {
    heading: {
      color: "accent",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
      bg: "background",
      fontSize: 5,
    },
    h1: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
    h2: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
    h3: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
    h4: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
    h5: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
    h6: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
    p: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
    span: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
    a: {
      color: "text",
      textDecoration: "underline",
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    img: {
      maxWidth: "100%",
    },
  },
};

export default theme;
