import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { animated, useSpring } from "@react-spring/web";
import { Box, Button, Typography } from "@mui/material";
import logo from "../../assets/images/mainlogo.png";

const containerVariants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1, // Reduced the duration to 1 second for faster animation
      delay: 0.5, // Delay the animation by 0.5 seconds
    },
  },
};

export const Getstarted = () => {
  const [showComponents, setShowComponents] = useState(false);
  const animationProps = useSpring({
    from: { opacity: 0, y: -50 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 15 },
  });

  const animationBounceProps = useSpring({
    from: { opacity: 0, y: -100 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 100 },
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowComponents(true);
    }, 1200);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: 4,
        backgroundImage: `url(${
          process.env.PUBLIC_URL + "/assets/getstarted.jpg"
        })`,
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={logo}
          alt=""
          height="250px"
          width="250px"
          sx={{
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            filter: "grayscale(50%) contrast(150%)",
          }}
        />
        <animated.div style={animationBounceProps}>
          <animated.div style={animationProps}>
            <Typography
              variant="h3"
              sx={{
                color: "red",
                my: 3,
                textAlign: "center",
                fontFamily: "Merriweather",
              }}
            >
              Welcome to Placement and Training Management Cell
            </Typography>
          </animated.div>
        </animated.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={showComponents ? "visible" : "hidden"}
        >
          {showComponents && (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 24,
                  paddingTop: "10%",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "white",
                    my: 2,
                    textAlign: "center",
                    textShadow: "-moz-initial",
                    fontFamily: "Libre Baskerville",
                  }}
                >
                  We help connect job seekers with potential employers and
                  provide <br />
                  training programs to enhance your skills and boost your career{" "}
                  <br />
                  opportunities.
                </Typography>
                <Link to="/HomePage">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "ButtonText",
                      color: "white",
                      p: 2,
                      borderRadius: 50,
                    }}
                  >
                    GET STARTED
                  </Button>
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </Box>
  );
};
