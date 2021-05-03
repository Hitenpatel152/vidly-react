import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MovieIcon from '@material-ui/icons/Movie';
import TheatersIcon from '@material-ui/icons/Theaters';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import {ExitToApp} from '@material-ui/icons'

import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    appBar: {
      background: '#FF0046',
      zIndex: theme.zIndex.drawer + 1,
    },
   
  }));
  const handleLogout = (history) => {
        
    localStorage.removeItem("authToken");
    history.push("/login");
};
const Navigation = () => {
    const classes = useStyles();
    let history = useHistory()
    
    return (
        
        <>
            <nav class="upper-nav navbar navbar-expand-lg navbar-light bg-light">
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                    <Typography variant="h6" noWrap>
                        Vidly
                    </Typography>
                    </Toolbar>
                </AppBar>
            </nav>
            <nav className="side-nav float-left" style={{width:'15%'}}>
                <List className="pt-2">
                    <ListItem button onClick={() => history.push("/home")} key={0}>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={() => history.push("/genere")} key={1}>
                        <ListItemIcon><TheatersIcon /></ListItemIcon>
                        <ListItemText primary={'Genere'} />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={() => history.push("/movie")} key={2}>
                        <ListItemIcon><MovieIcon /> </ListItemIcon>
                        <ListItemText primary={'Movie'} />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={() => history.push("/rental")} key={3}>
                        <ListItemIcon><AssignmentIcon /></ListItemIcon>
                        <ListItemText primary={'Rental'} />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={() => history.push("/customer")} key={4}>
                        <ListItemIcon><PersonIcon /></ListItemIcon>
                        <ListItemText primary={'Customer'} />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={() =>handleLogout(history)} key={5}>
                        <ListItemIcon><ExitToApp /></ListItemIcon>
                        <ListItemText primary={'Logout'} />
                    </ListItem>
                </List>
            </nav>
        </>
            
    );
};

export default Navigation;