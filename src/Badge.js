import { Box, Flex, Text, Image } from "theme-ui";
import Topper from "./images/BadgeTopper.svg";
import { useEffect, useState, useCallback } from "react";
import Headshot from "./images/Headshot.png";
import HeadshotWebp from "./images/Headshot.webp";
import LogoMask from "./images/LogoMask.svg";

const settings = {
  height: "15rem",
  width: "10.5rem",
  photoSize: "7.5rem",
  top: "2.5rem",
  left: ['0', '0', '67vw'],
  hologramSize: "2.5rem",
  transition: "500ms",
};

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

function Badge() {
  const [rotation, setRotation] = useState(0);

  const handleScroll = useCallback(throttle(() => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    // At top or bottom
    if (scrollY < 1 || scrollY >= maxScroll) {
      setRotation(0);
      return;
    }
    
    // Calculate rotation based on last scroll position
    const delta = scrollY - (handleScroll.lastScrollY || 0);
    handleScroll.lastScrollY = scrollY;
    
    // Clamp rotation between -30 and 30 degrees
    const clampedDelta = Math.max(Math.min(delta, 30), -30);
    setRotation(clampedDelta);
    
    // Reset rotation after a delay
    clearTimeout(handleScroll.resetTimeout);
    handleScroll.resetTimeout = setTimeout(() => {
      setRotation(0);
    }, 150);
  }, 50), []); // 50ms throttle

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(handleScroll.resetTimeout);
    };
  }, [handleScroll]);

  return (
    <Box
      sx={{
        position: ['static', 'static', 'fixed'],
        left: settings.left,
        top: settings.top,
        transform: ['none', 'none', `rotate(${rotation}deg)`],
        transition: settings.transition,
        transformOrigin: "50% -20%",
        zIndex: 999,
        mx: ['auto', 'auto', 0],
        mb: [4, 4, 0],
      }}
    >
      <Flex
        sx={{
          width: settings.width,
          height: settings.height,
          p: 3,
          pt: 5,
          pb: 5,
          gap: 4,
          bg: "#FFF",
          color: "#000",
          borderRadius: 30,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          border: "10px solid rgba(51, 54, 255, 0.8)",
          transition: "box-shadow 100ms",
          position: "relative",
        }}
      >
        <Flex sx={{ flexDirection: "column" }}>
          <Text align="center" sx={{ fontSize: 5, fontWeight: 500 }}>
            Andrew Liebchen
          </Text>
          <Text align="center" sx={{ fontSize: 2 }}>
            Fractional Product Designer
          </Text>
        </Flex>
        <picture>
          <source srcSet={HeadshotWebp} type="image/webp" />
          <Image
            src={Headshot}
            loading="eager"
            sx={{
              size: settings.photoSize,
              borderRadius: settings.photoSize,
              flex: "0 0 auto",
            }}
            width={300}
            height={300}
          />
        </picture>
        <Box
          sx={{
            mask: `url(${LogoMask})`,
            position: "absolute",
            bottom: "1.25rem",
            right: "1.25rem",
            size: settings.hologramSize,
            borderRadius: settings.hologramSize,
            transform: "rotate(5deg)",
          }}
        >
          <Box
            sx={{
              background:
                "conic-gradient(from 180deg at 50% 50%, rgba(255, 255, 255, 0.72) 16.875deg, #000 88.12500178813934deg, rgba(255, 255, 255, 0.72) 151.875deg, #000 225deg, rgba(255, 255, 255, 0.72) 288.7499928474426deg, #000 360deg), conic-gradient(from 180deg at 50% 50%, #FFF 30.00000089406967deg, #000 95.625deg, #FFF 168.75deg, #000 228.75000715255737deg, #FFF 285.0000071525574deg, #000 360deg), radial-gradient(92.48% 91.85% at 10.11% 28.24%, #FB876E 7.61%, #42FFD2 35.14%, #42D2FF 63.45%, #42A4FF 100%), url(https://grainy-gradients.vercel.app/noise.svg)",
              backgroundBlendMode: "screen, difference, normal",
              transform: `rotate(${rotation * -3}deg)`,
              transition: settings.transition,
              size: settings.hologramSize,
            }}
          />
        </Box>
      </Flex>
      <Image
        src={Topper}
        loading="eager"
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
