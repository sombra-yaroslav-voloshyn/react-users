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


const header = () => {
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
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <PersonIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default header;
