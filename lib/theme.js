import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  default: {
    primary: "#ffe8d6",
    primaryDark: "#666",
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