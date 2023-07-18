import * as React from "react";
import HailIcon from "@mui/icons-material/Hail";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import { Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
  
})(({ theme, open }) => ({
  
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Nav() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
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
        <AppBar
          position="fixed"
          open={open}
          sx={{ backgroundColor: "#6600cc", }}
        >
          <Toolbar >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/Homepage">
              <Typography
                variant="h5"
                noWrap
                component="div"
                fontFamily={'Castoro Titling'}
                sx={{ cursor: "pointer" }}
              >
                PLACEMENT PRO
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List
            sx={{
              display: "flex",
              
              flexDirection: "column",
              margin: "0 auto",
            }}
          >
            {/* <Link to="/homepage">
              <ListItem sx={{ gap: 2, p: 3 }}>
                <HomeIcon />
                <Typography variant="p">HOME</Typography>
              </ListItem>
            </Link> */}
            <ListItem sx={{ gap: 2, p: 3 }}>
              <ContactPageIcon />
              <Typography variant="p">CONTACT</Typography>
            </ListItem>
            <ListItem sx={{ gap: 2, p: 3 }}>
              <GroupAddIcon />
              <Typography variant="p">OUR PROMINANAT RECRUITERS</Typography>
            </ListItem>
            <ListItem sx={{ gap: 2, p: 3 }}>
              <PhotoAlbumIcon />
              <Typography variant="p">PHOTO GALARY</Typography>
            </ListItem>
            <Divider />
            <ListItem sx={{ gap: 2, p: 3 }}>
              <ContactPageIcon />
              <button onClick={handleOpen1}>
                <Typography variant="p">LOGIN</Typography>
              </button>
              <Modal
                open={openModal1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Paper elevation={3}>
                  <Box
                    sx={{
                      backgroundImage: `url(https://plus.unsplash.com/premium_photo-1668473365978-5f29069b0c6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80)`,
                      backgroundSize: "cover",
                      width: { xs: "100px", md: "500px" },
                      height: { xs: "300px", md: "350px" },
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
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
                            height: "30px",
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
                            height: "30px",
                            width: "350px",
                          }}
                        >
                          Student
                        </Button>
                      </Link>
                      <Link to="/">
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
                            height: "30px",
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
            </ListItem>
            <ListItem sx={{ gap: 2, p: 3 }}>
              <ContactPageIcon />
              <button onClick={handleOpen}>
                <Typography variant="p">REGISTER</Typography>
              </button>
              <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Paper elevation={3}>
                  <Box
                    sx={{
                      backgroundImage: `url(https://plus.unsplash.com/premium_photo-1668473365978-5f29069b0c6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80)`,
                      backgroundSize: "cover",
                      width: { xs: "100px", md: "500px" },
                      height: { xs: "300px", md: "350px" },
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
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
                            height: "30px",
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
                            height: "30px",
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
            </ListItem>
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
        </Main>
      </Box>
    </>
  );
}
