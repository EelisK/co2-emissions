import React from "react";
import { Typography, AppBar, Toolbar } from "@material-ui/core";

const Header = () => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" gutterBottom>
                CO<sup>2</sup>-EMISSIONS
            </Typography>
        </Toolbar>
    </AppBar>
);

export default Header;