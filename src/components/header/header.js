import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import {NavLink} from 'react-router-dom';
import './header.scss';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TypoGraphy from '@material-ui/core/Typography'
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import * as authActions from "../../store/actions/authActions";
import {connect} from "react-redux";


const Header = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const openMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuOption = () => {
        setAnchorEl(null);
    };

    return (
        <div className='Header'>
            <AppBar position="static">
                <Toolbar className="toolbar">
                    <div className="navigations">
                        <List component="nav">
                            <ListItem component="div">
                                <ListItemText inset>
                                    <TypoGraphy color="inherit">
                                        <NavLink
                                            to="/home"
                                            exact>Home</NavLink>
                                    </TypoGraphy>
                                </ListItemText>

                                <ListItemText inset>
                                    <TypoGraphy color="inherit">
                                        <NavLink
                                            to="/users"
                                            exact>Users</NavLink>
                                    </TypoGraphy>
                                </ListItemText>

                                <ListItemText inset>
                                    <TypoGraphy color="inherit">
                                        <NavLink
                                            to="/link1"
                                            exact>Link 1</NavLink>
                                    </TypoGraphy>
                                </ListItemText>
                            </ListItem >
                        </List>
                    </div>
                    <div>
                        <IconButton aria-controls="user-menu"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={openMenu}
                        >
                            <PersonIcon/>
                        </IconButton>
                        <Menu
                            id="user-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuOption}
                        >
                            <MenuItem onClick={handleMenuOption}>Profile</MenuItem>
                            <MenuItem onClick={() => {setAnchorEl(null);props.logout()}}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authActions.logout()),
    };
};

export default connect(null, mapDispatchToProps)(Header);
