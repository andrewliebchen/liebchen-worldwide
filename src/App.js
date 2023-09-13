import theme from "./theme";
import { ThemeUIProvider, Box, Text, Heading, Grid, Flex } from "theme-ui";
import IdeasSection from "./IdeasSection";
import YouTube from "react-youtube";
import Badge from "./Badge";

function App() {
  return (
    <ThemeUIProvider theme={theme}>
      <Box sx={{ height: "1000vh" }}>
        <Badge />
      </Box>
    </ThemeUIProvider>
  );
}

export default App;
