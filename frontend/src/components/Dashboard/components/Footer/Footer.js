import { Typography} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Container from '@material-ui/core/Container';
import React from 'react';

export default function Footer() {
    return (
        <AppBar position="static" color="inherit">
          <Container maxWidth="lg">
            <Toolbar>
              <Typography variant="body1" color="inherit">
                <small>© {new Date().getFullYear()} Global Alliance For Trade Facilitation </small>
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}