import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  default: {
    primary: "#fbeee4",
    primaryDark: "#666",
    secondary: "#e6dfcc",
    secondaryDark: "#a9a9a9",
    text: "#0e1111",
    textDark: "#fbfaf5"
  }
};

const fonts = {
  body: "Noticia Text, serif",
  heading: "Vollkorn, serif",
  mono: "Menlo, monospace",
};

const theme = extendTheme({ 
  config, 
  colors,
  fonts, 
});

export default theme;