import * as React from "react";
import HailIcon from "@mui/icons-material/Hail";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { useState, useEffect } from "react";
import axios from "axios";
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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Man4Icon from "@mui/icons-material/Man4";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import FeedIcon from "@mui/icons-material/Feed";
import { Badge } from "@mui/material";
import { Avatar } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import WorkIcon from "@mui/icons-material/Work";

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

export default function Nav4() {
  const [studentCount, setStudentCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:4000/auth/countRegStudent")
      .then((response) => {
        const { count } = response.data;
        setStudentCount(count);
      })
      .catch((error) => {
        console.error(error);
      });
    axios.get("http://localhost:4000/auth/countRegCompany").then((response) => {
      const { count } = response.data;
      setCompanyCount(count);
    });
  }, []);
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
          sx={{ backgroundColor: "#6600cc" }}
        >
          <Toolbar>
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
                fontFamily={"Castoro Titling"}
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
            <Link to="/Stu_dash">
              <ListItem sx={{ gap: 2, p: 3 }}>
                <HomeIcon />
                <Typography variant="p">HOME</Typography>
              </ListItem>
            </Link>
            <Link to="/Stu_pro">
              <ListItem sx={{ gap: 2, p: 3 }}>
                <AccountBoxIcon />
                <Typography variant="p">Set/Update Profile</Typography>
              </ListItem>
            </Link>
            <Link to="/JobTab">
              <ListItem sx={{ gap: 2, p: 3 }}>
                {/* <Badge color="error" badgeContent={studentCount} showZero> */}
                <WorkIcon />
                {/* </Badge> */}
                <Typography variant="p">Job Search</Typography>
              </ListItem>
            </Link>
            <Link to="/MyApplicatons">
              <ListItem sx={{ gap: 2, p: 3 }}>
                <AddBusinessIcon />
                <Typography variant="p">My Applications</Typography>
              </ListItem>
            </Link>
            <Link to="/EventAndNewsStu">
              <ListItem sx={{ gap: 2, p: 3 }}>
                <FeedIcon />
                <Typography variant="p">Carrer Resourses</Typography>
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
        </Main>
      </Box>
    </>
  );
}
