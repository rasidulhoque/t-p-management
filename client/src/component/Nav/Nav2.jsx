import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import HailIcon from "@mui/icons-material/Hail";
import { Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { Paper, Fade, MenuItem, Menu } from "@mui/material";

// import Student_login from "../";

const drawerWidth = 240;
// const navItems = ['Home', 'About us', 'Contact us','Our Prominant Placement','Login','New User? Register!'];

function Nav2(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center", flexDirection: "column" }}>
            <ListItemText>home</ListItemText>
            <ListItemText>About Us</ListItemText>
            <ListItemText>Contact Us</ListItemText>
            <ListItemText>Our Prominant Recruiters</ListItemText>
            <ListItemText></ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [openModal1, setOpenModal1] = React.useState(false);
  const handleOpen1 = () => setOpenModal1(true);
  const handleClose1 = () => setOpenModal1(false);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Toolbar
          sx={{
            background: "#012949",
            width: "100%",
            justifyContent: { xs: "left", md: "center" },
            gap: 4,
            paddingTop:"20px"
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff" }}>About Us</Button>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff" }}>Contact Us</Button>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff" }}>Our Prominant Recruiters</Button>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff" }}>Placement Tally</Button>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button onClick={handleOpen1}>
              <Typography variant="p" color="#fff">
                LOGIN
              </Typography>
            </Button>
            <Modal
              open={openModal1}
              onClose={handleClose1}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Paper elevation={24}>
                <Box
                  sx={{
                    backgroundImage: `url(https://plus.unsplash.com/premium_photo-1668473365978-5f29069b0c6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80)`,
                    backgroundSize: "cover",
                    width: { xs: "100px", md: "900px" },
                    height: { xs: "300px", md: "600px" },
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    borderRadius: "12px",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 1,
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4">Login as?</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 3,
                      marginTop: "50px",
                    }}
                  >
                    <Link to="/Admin_login">
                      <Button
                        startIcon={<HailIcon />}
                        sx={{
                          "&:hover": {
                            border: "1px solid #00FF00",
                            color: "black",
                            backgroundColor: "lightseagreen",
                          },
                          backgroundColor: "blue",
                          color: "white",
                          height: "5 0px",
                          width: "350px",
                        }}
                      >
                        Admin
                      </Button>
                    </Link>
                    <Link to="/Student_login">
                      <Button
                        startIcon={<HailIcon />}
                        sx={{
                          "&:hover": {
                            border: "1px solid #00FF00",
                            color: "black",
                            backgroundColor: "lightblue",
                          },
                          backgroundColor: "green",
                          color: "white",
                          height: "5 0px",
                          width: "350px",
                        }}
                      >
                        Student
                      </Button>
                    </Link>
                    <Link to="/Company_login">
                      <Button
                        startIcon={<HailIcon />}
                        sx={{
                          "&:hover": {
                            border: "1px solid #00FF00",
                            color: "black",
                            backgroundColor: "lightsalmon",
                          },
                          backgroundColor: "orange",
                          color: "white",
                          height: "5 0px",
                          width: "350px",
                        }}
                      >
                        Commpany
                      </Button>
                    </Link>
                  </Box>
                  <Paper elevation={5} />
                </Box>
              </Paper>
            </Modal>
          </Box>
          

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button onClick={handleOpen}>
              <Typography variant="body1" color="white">
                REGISTER
              </Typography>
            </Button>
            <Modal
              open={openModal}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Paper elevation={24}>
                <Box
                  sx={{
                    backgroundImage: `url(https://plus.unsplash.com/premium_photo-1668473365978-5f29069b0c6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80)`,
                    backgroundSize: "cover",
                    width: { xs: "100px", md: "900px" },
                    height: { xs: "300px", md: "600px" },
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    borderRadius: "12px",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 1,
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4">Register as?</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 3,
                      marginTop: "50px",
                    }}
                  >
                    <Link to="/stu_reg">
                      <Button
                        startIcon={<HailIcon />}
                        sx={{
                          "&:hover": {
                            border: "1px solid #00FF00",
                            color: "black",
                            backgroundColor: "lightgoldenrodyellow",
                          },
                          backgroundColor: "green",
                          color: "white",
                          height: "50px",
                          width: "350px",
                        }}
                      >
                        Student
                      </Button>
                    </Link>
                    <Link to="/Company_reg">
                      <Button
                        startIcon={<HailIcon />}
                        sx={{
                          "&:hover": {
                            border: "1px solid #00FF00",
                            color: "black",
                            backgroundColor: "lightsalmon",
                          },
                          backgroundColor: "orange",
                          color: "white",
                          height: "50px",
                          width: "350px",
                        }}
                      >
                        Commpany
                      </Button>
                    </Link>
                  </Box>

                  <Paper elevation={5} />
                </Box>
              </Paper>
            </Modal>
          </Box>
        </Toolbar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
}

Nav2.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Nav2;
