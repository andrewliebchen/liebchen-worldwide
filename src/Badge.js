import { Heading, Box, Flex, Text, Image } from "theme-ui";
import Topper from "./images/BadgeTopper.svg";

const photoSize = "6.5rem";

function Badge() {
  return (
    <Box
      sx={{
        position: "fixed",
        right: "2rem",
        top: "4rem",
        transform: "rotate(15deg)",
      }}
    >
      <Flex
        py={5}
        px={3}
        sx={{
          width: "10rem",
          height: "15rem",
          bg: "background",
          borderRadius: 20,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          border: "10px solid #CCCDFF",
        }}
      >
        <Heading
          as="h2"
          align="center"
          sx={{ fontSize: 5, textTransform: "uppercase", fontWeight: 500 }}
        >
          Andrew Liebchen
        </Heading>
        <Text align="center" mt={1} sx={{ fontSize: 2 }}>
          Fractional Product Designer
        </Text>
        <Box
          sx={{
            mt: 3,
            width: photoSize,
            height: photoSize,
            bg: "primary",
            borderRadius: photoSize,
            flex: "0 0 auto",
          }}
        ></Box>
      </Flex>
      <Image
        src={Topper}
        sx={{
          position: "absolute",
          top: "1.5rem",
          left: "50%",
          transform: "translate3d(-50%, -100%, 0)",
        }}
      />
    </Box>
  );
}

export default Badge;
