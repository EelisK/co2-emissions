import React from "react";
import { Fab } from "@material-ui/core";
import ArrowUpIcon from "./ArrowUpIcon";

class ScrollTop extends React.Component {

    constructor(props) {
        super(props);
        this.scrollListener = this.scrollListener.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = { visible: false };
    }

    onClick() {
        window.scrollTo({
            behavior: "smooth",
            left: 0,
            top: 0,
        });
    }

    componentDidMount() {
        window.addEventListener("scroll", this.scrollListener);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollListener);
    }

    scrollListener(evt) {
        const visible = this.state.visible;
        const shouldBeVisible = evt.pageY > 110;
        const correctState = visible === shouldBeVisible;
        if (!correctState) {
            this.setState({ visible: shouldBeVisible });
        }
    }

    render() {
        const visible = this.state.visible;
        return (
            <Fab size="medium" color="secondary" className={`co2-app-scroll-top`} hidden={!visible} onClick={this.onClick}>
                <ArrowUpIcon />
            </Fab >
        );
    }
};

export default ScrollTop;