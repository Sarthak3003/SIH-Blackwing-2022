import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stambh from "../utils/stambh.png";
import MailIcon from "@mui/icons-material/Mail";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import BookIcon from "@mui/icons-material/Book";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Button from "@mui/material/Button";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import chatbotConfig from "../utils/chatbotConfig";
import MessageParser from "./Chatbot/MessageParser";
import ActionProvider from "./Chatbot/ActionProvider";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import {IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StorefrontIcon from '@mui/icons-material/Storefront';

// import theme from "../App";

const page = {
  width: "100%",
};

const drawerWidth = 240;

const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
  backgroundColor: "#243665",
  color: "#FFFFFF",
  zIndex: (theme) => theme.zIndex.drawer + 2,
};

function Layout({ children, size, setSize }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);

  const toggleDiv = () => {
    setShowChat((prev) => !prev);
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {[
            "Tenders Uploaded",
            "Progress Log",
            "Report Grievance",
            "Track Status",
            "E-Bazaar",
            "Logout",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                to={
                  index === 0
                    ? "/bidder"
                    : index === 1
                    ? "/bidder/progress"
                    : index === 2
                    ? "/bidder/grievance"
                    : index === 3
                    ? "/bidder/status"
                    : index === 4
                    ? "/bidder/ebazar"
                    : "/"
                }
                onClick={() => {
                  if (index === 5) {
                    localStorage.removeItem("user");
                    localStorage.removeItem("setAt");
                    localStorage.removeItem("expireAt");
                    localStorage.removeItem("authSmsId");
                    localStorage.removeItem("authEmailId");
                    localStorage.removeItem("token");
                    navigate("/");
                  }
                }}
              >
                <ListItemIcon>
                  {index === 0 ? (
                    <BackupTableIcon />
                  ) : index === 1 ? (
                    <BookIcon />
                  ) : index === 2 ? (
                    <CommentIcon />
                  ) : index === 3 ? (
                    <StackedLineChartIcon />
                  ) : index === 4 ? (
                    <StorefrontIcon />
                  ) : index === 5 ? (
                    <LogoutIcon />
                  ) : 
                  (
                    <MailIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
  return (
    <>
      <div style={{ display: "flex" }}>
        {/* app bar  */}
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          elevation={0}
        >
          <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
            <Typography
              variant="h4"
              noWrap
              component="a"
              fontFamily="Bebas Neue"
              sx={{
                letterSpacing: "0.3rem",
                textDecoration: "none",
                color: "#fff",
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              <img src={Stambh} alt="stambh" style={{ width: "5.3rem" }} />{" "}
              E-PROCUREMENT PORTAL
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, minHeight: "100vh" }}
          aria-label="mailbox folders"
        >
          <Drawer
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
              minHeight: "100vh",
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                minHeight: "100vh",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <div style={page}>
          <Box sx={{ ...theme.mixins.toolbar, paddingBottom: 10 }}></Box>
          {children}
        </div>
        <div>
          <div>
            {showChat && (
              <Box
                sx={{
                  margin: 0,
                  top: "auto",
                  right: 20,
                  bottom: 20,
                  left: "auto",
                  position: "fixed",
                  marginBottom: "3rem",
                  zIndex: (theme) => theme.zIndex.drawer + 2,
                }}
              >
                <Chatbot
                  config={chatbotConfig}
                  messageParser={MessageParser}
                  actionProvider={ActionProvider}
                />
              </Box>
            )}
          </div>
          <Button variant="fab" aria-label="add" sx={style} onClick={toggleDiv}>
            <ChatBubbleIcon />
          </Button>
        </div>
      </div>
    </>
  );
}

export default Layout;