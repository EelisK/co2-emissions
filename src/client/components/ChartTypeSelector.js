import React from "react";
import { Button, MenuItem, MenuList, Popper, Paper, Grow, ClickAwayListener } from "@material-ui/core";
import ChartType from "../util/ChartType";

class ChartTypeSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.getTypeSetter = this.getTypeSetter.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    toggleMenu() {
        this.setState(prevState => ({ open: !prevState.open }));
    }

    closeMenu() {
        this.setState({ open: false });
    }

    getTypeSetter(type) {
        return () => {
            this.props.setType(type);
            this.closeMenu();
        };
    }

    render() {
        return (
            <div>
                <Button buttonRef={node => this.anchorEl = node} onClick={this.toggleMenu}>
                    {this.props.type}
                </Button>
                <Popper open={this.state.open} anchorEl={this.anchorEl} transition disablePortal style={{ zIndex: 1 }}>
                    {({ TransitionProps }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: "bottom" }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={this.closeMenu}>
                                    <MenuList>
                                        <MenuItem onClick={this.getTypeSetter(ChartType.Graph)}>Graph</MenuItem>
                                        <MenuItem onClick={this.getTypeSetter(ChartType.Table)}>Table</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div >
        );
    }
};

export default ChartTypeSelector;
