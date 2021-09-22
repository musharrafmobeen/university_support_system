import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Paper, Avatar, Switch, Drawer, AppBar, Toolbar, List, CssBaseline,
    Divider, IconButton, ListItem, ListItemIcon, ListItemText, withStyles, Hidden, Menu, MenuItem
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import BookIcon from '@material-ui/icons/Book';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import StoreIcon from '@material-ui/icons/Store';
import SearchIcon from "@material-ui/icons/Search";
// import NavBarMenuIcon from '../../resources/design-icons/NavBarMenuIcon';


import styles from '../../styles/adminStyles/AdminSideDrawerStyles';
import { DrawerWidthContext } from '../../contexts/DrawerWidthContext';

import { InputBase } from '@material-ui/core';

import AppointmentIcon from '../../resources/design-icons/AppointmentIcon';

import IIU_Arabic from '../../resources/design-images/IIUI_Arabic.svg'
import IIU_LOGO_IMG from '../../resources/design-images/IIUI_LOGO_IMG.svg'

import { Redirect, withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import useToggleState from '../../hooks/useToggleState';
import { drawerSelectionChanged } from '../../store/ui/drawer';
import TimeTableIcon from '../../resources/design-icons/TimeTableIcon';
import PendingRequestsIcon from '../../resources/design-icons/PendingRequestsIcon';
import CategoriesIcon from '../../resources/design-icons/CategoriesIcon';
import DocsRequestedIcon from '../../resources/design-icons/DocsRequestedIcon';
import { authLoggedOut, getCurrentAuth } from '../../store/auth/auth';
import { AccountIcon, LogoutIcon } from '../../resources/design-icons/userMenuIcons';
import AlertMessageDialog from '../helpers/AlertMessageDialog';
import configData from '../../config.json';

function StudentSideDrawer(props) {
    const { classes } = props;
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user);
    const selection = useSelector(state => state.ui.drawer.selection);
    const loggedIn = localStorage.getItem("loggedIn");
    const authError = loggedIn !== "true" ? true : false;
    const userRole = useSelector(state => state.auth.role);
    const authToken = localStorage.getItem("token");
    useEffect(() => {
        if (!authError) {
            dispatch(getCurrentAuth(authToken));
        }
        dispatch(drawerSelectionChanged("Dashboard"));
    }, []);
    const returnToHome = () => (<Redirect to="/" />);
    const returnToPendingPage = () => (<Redirect to="/users/account-approval-pending" />);
    const returnToRejectedPage = () => (<Redirect to="/users/account-rejected" />);
    const theme = useTheme();

    const { isCollapsed, changeDrawerWidth } = useContext(DrawerWidthContext);

    const iconColor = "#788497";
    const appBgColor = "#45a62d";//"#674FFF";
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElAvatar, setAnchorElAvatar] = useState(null);
    const [openAlert, toggleAlert] = useToggleState(false);

    const [navMenuItemSelection, setNavMenuItemSelection] = React.useState("none");
    const [anchorElmenuIcon, setAnchorElmenuIcon] = React.useState(null);

    const handleAlert = () => {
        setAnchorElAvatar(null);
        toggleAlert();
    };

    const handleDrawerOpen = () => {
        changeDrawerWidth();
    };

    const handleDrawerClose = () => {
        changeDrawerWidth();
    };
    const handleAvatarClick = (event) => {
        setAnchorElAvatar(event.currentTarget);
    };

    const handleMenuClick = (event) => {
        setAnchorElmenuIcon(event.currentTarget);
    };
    const isXL = useMediaQuery(theme.breakpoints.up("xl"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const showProfile = () => {
        setAnchorElAvatar(null);
        props.history.push("/employee/my-profile");
    };
    const logUserOut = () => {
        localStorage.setItem("token", "");
        localStorage.setItem("loggedIn", false);
        dispatch(authLoggedOut());
        props.history.push("/");
    };

    // const menuItemsList = [
    //     {
    //         content: "New Webinar",
    //         icon: <WebinarIcon fontSize={isXL ? 'large' : ''} />,
    //     },
    //     {
    //         content: "New Payment",
    //         icon: <NewPaymentIcon fontSize={isXL ? 'large' : ''} />,
    //     },
    //     {
    //         content: "New Student",
    //         icon: <PeopleAltIcon style={{ color: appBgColor }} fontSize={isXL ? 'large' : ''} />,
    //     },
    //     {
    //         content: "Settings",
    //         icon: <SettingsIcon fontSize={isXL ? 'large' : ''} />,
    //     },
    //     {
    //         content: "Support",
    //         icon: <SupportIcon fontSize={isXL ? 'large' : ''} />,
    //     },
    //     {
    //         content: "Documentation",
    //         icon: <DocumentationIcon fontSize={isXL ? 'large' : ''} />,
    //     },
    // ];
    if (authError) return returnToHome();
    if (Object.keys(currentUser).length !== 0 && userRole !== "employee") return returnToHome();
    if (Object.keys(currentUser).length !== 0 && currentUser.isRejected) return returnToRejectedPage();
    if (Object.keys(currentUser).length !== 0 && !currentUser.isRejected && !currentUser.isApproved) return returnToPendingPage();
    return (
        <>
            {/* {Object.keys(currentUser).length === 0 ? returnToHome() : ""} */}
            <div className={classes.root}>
                <CssBaseline />
                <div
                    className={!isCollapsed ? classes.drawerIconButtonHolderCollapsed : classes.drawerIconButtonHolderOpen}
                >
                    <div>
                        {!isCollapsed ? <IconButton
                            onClick={handleDrawerOpen}
                            className={classes.drawerIconButton}
                        >
                            <ChevronRightIcon fontSize={isXL ? 'large' : ''} />
                        </IconButton> :
                            <IconButton
                                onClick={handleDrawerClose}
                                className={classes.drawerIconButton}
                            >
                                <ChevronLeftIcon fontSize={isXL ? 'large' : ''} />
                            </IconButton>}
                    </div>
                </div>

                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: isCollapsed,
                        [classes.drawerClose]: !isCollapsed,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: isCollapsed,
                            [classes.drawerClose]: !isCollapsed,
                        }),
                    }}
                >
                    {
                        !isCollapsed ?
                        <img src={IIU_LOGO_IMG} className={classes.drawerLogo} />
                        :
                        <img src={IIU_Arabic} className={classes.drawerLogo} />
                    }
                    <Divider />
                    <List>
                        <ListItem button key={"Dashboard"}
                            onClick={() => {
                                props.history.push('/employee/dashboard');
                            }}
                            style={selection === "Dashboard" ? { backgroundColor: appBgColor, color: "white" } : {}}
                        >
                            <ListItemIcon><ViewQuiltIcon style={selection === "Dashboard" ? { color: "white" } : { color: iconColor, }} /></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button key={"grievances"}
                            onClick={() => {
                                props.history.push('/employee/grievances');
                            }}
                            style={selection === "Grievances" ? { backgroundColor: appBgColor, color: "white" } : {}}
                        >
                            <ListItemIcon><BookIcon style={selection === "Grievances" ? { color: "white" } : { color: iconColor, }} /></ListItemIcon>
                            <ListItemText primary="Grievances" />
                        </ListItem>
                        <ListItem button key={"staff"}
                            onClick={() => {
                                props.history.push('/employee/staff');
                            }}
                            style={selection === "Staff" ? { backgroundColor: appBgColor, color: "white" } : {}}
                        >
                            <ListItemIcon><AssignmentIndIcon style={selection === "Staff" ? { color: "white" } : { color: iconColor, }} /></ListItemIcon>
                            <ListItemText primary="Staff" />
                        </ListItem>
                        {/* <ListItem button key={"docsRequested"}
                            onClick={() => {
                                props.history.push('/employee/documents-requests');
                            }}
                            style={selection === "Documents-Requests" ? { backgroundColor: appBgColor, color: "white" } : {}}
                        >
                            <ListItemIcon><DocsRequestedIcon style={selection === "Documents-Requests" ? { color: "white" } : { color: iconColor, }} /></ListItemIcon>
                            <ListItemText primary="Documents Requests" />
                        </ListItem>
                        <ListItem button key={"timeTable"}
                            onClick={() => {
                                props.history.push('/employee/request-appointments');
                            }}
                            style={selection === "Request-Appointments" ? { backgroundColor: appBgColor, color: "white" } : {}}
                        >
                            <ListItemIcon><AppointmentIcon style={selection === "Request-Appointments" ? { color: "white" } : { color: iconColor, }} /></ListItemIcon>
                            <ListItemText primary="Request Appointments" />
                        </ListItem> */}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <Paper style={{ margin: "10px", borderRadius: "10px" }}>
                        <AppBar position='static' style={{
                            backgroundColor: "white",
                            borderRadius: "10px",
                            color: "black",

                        }}>
                            <Toolbar>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search..."
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput
                                        }}
                                    />
                                </div>
                                <div className={classes.grow} />
                                <div className={classes.userMenuIcon}>
                                    <IconButton
                                        onClick={handleAvatarClick}
                                    >
                                        <Avatar
                                            alt={currentUser.name}
                                            src={`${configData.url.baseUrl}/${currentUser.studentImage}`}
                                            style={{ border: `2px solid #674FFF` }} />
                                    </IconButton>
                                </div>
                            </Toolbar>
                        </AppBar>
                    </Paper>
                    {/* <MenuContent
                        anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl}
                        itemsList={consts.languageItemsList}
                        changeSelection={changeLanguage}
                        specialItem={null}
                        specialItemClick={""}
                        onBottom={isSmall} />
                    <MenuContent
                        anchorEl={anchorElmenuIcon}
                        setAnchorEl={setAnchorElmenuIcon}
                        itemsList={menuItemsList}
                        changeSelection={setNavMenuItemSelection}
                        specialItem={
                            {
                                content: 'Dark Mode',
                                icon: <DarkModeIcon />,
                                specialIcon: <Switch
                                    checked={isDarkMode}
                                    name="DarkMode"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            }
                        }
                        specialItemClick={handleTehemeChange}
                        onBottom={isSmall} />
                    <Paper className={classes.bottomBar} style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: "10px",
                        borderRadius: "10px",
                        width: "70%"
                    }}>
                        <AppBar position='static' style={{
                            backgroundColor: "white",
                            borderRadius: "10px",
                            color: "black",
                            width: "100%"

                        }}>
                            <Toolbar >
                                <div className={classes.bottomBarIcons}>
                                    <div className={''}>
                                        <IconButton
                                            onClick={handleMenuClick}
                                        >
                                            <NavBarMenuIcon style={Boolean(anchorElmenuIcon) ? { color: appBgColor } : { color: iconColor }} />
                                        </IconButton>
                                    </div>
                                    <div className={''}>
                                        <IconButton
                                            onClick={handleLangClick}
                                        >
                                            {handleLangIcon()}
                                        </IconButton>

                                    </div>
                                    <div className={''}>
                                        <IconButton
                                            onClick={handleAvatarClick}
                                        >
                                            <Avatar alt={currentUser.fullName} src={currentUser.fullname} style={{ border: `2px solid #674FFF` }} />
                                        </IconButton>
                                    </div>
                                </div>
                            </Toolbar>
                        </AppBar>
                    </Paper> */}
                </main>
                <Menu
                    anchorEl={anchorElAvatar}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: `${isSmall ? "top" : "bottom"}`, horizontal: "center" }}
                    transformOrigin={{ vertical: `${isSmall ? "bottom" : "top"}`, horizontal: "center" }}
                    keepMounted
                    open={Boolean(anchorElAvatar)}
                    onClose={() => { setAnchorElAvatar(null); }}
                    className={classes.menu}
                >
                    <MenuItem>
                        <ListItem onClick={showProfile}>
                            <ListItemIcon>
                                <AccountIcon fontSize={isXL ? 'large' : ''} />
                            </ListItemIcon>
                            <ListItemText primary={currentUser.name} />
                        </ListItem>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            toggleAlert();
                        }}
                    >
                        <ListItem>
                            <ListItemIcon>
                                <LogoutIcon fontSize={isXL ? 'large' : ''} />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </MenuItem>
                </Menu>
                <AlertMessageDialog
                    values={
                        {
                            openAlert,
                            title: "Do you really want to logout?",
                            content: "You will have to logIn again!",
                        }
                    }
                    handleCancel={handleAlert}
                    handleYes={logUserOut}
                />
            </div >
        </>
    );
}

export default withRouter(withStyles(styles)(StudentSideDrawer));