import { Heading, Box, Flex } from "theme-ui";

const photoSize = "6rem";

function Badge() {
  return (
    <Box
      sx={{ position: "fixed", right: 4, top: 4, transform: "rotate(10deg)" }}
    >
      <Flex
        p={3}
        sx={{
          width: "10rem",
          height: "15rem",
          bg: "#F5F5FF",
          borderRadius: 20,
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "center",
          border: "5px solid #CCCDFF",
        }}
      >
        <Heading as="h2" align="center">
          Andrew Liebchen
        </Heading>
        <Box
          sx={{
            width: photoSize,
            height: photoSize,
            bg: "primary",
            borderRadius: photoSize,
          }}
        ></Box>
      </Flex>
    </Box>
  );
}

export default Badge;
