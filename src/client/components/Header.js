import React from "react";
import { Typography, AppBar, Toolbar } from "@material-ui/core";

const Header = () => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" gutterBottom>
                CO<sub>2</sub>-EMISSIONS
            </Typography>
        </Toolbar>
    </AppBar>
);

export default Header;