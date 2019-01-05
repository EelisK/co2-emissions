import React from "react";
import { Divider, IconButton, InputBase, Paper } from "@material-ui/core";
import CloseIcon from "../assets/img/close.svg";
import MagnifyIcon from "../assets/img/magnify.svg";

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.state = { country: "" };
    }

    onChange(evt) {
        this.setState({ country: evt.target.value });
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.props.fetchEmissions(this.state.country);
    }

    clearInput() {
        this.setState({ country: "" });
        this.inputRef && this.inputRef.focus();
    }

    render() {
        return (
            <form className="co2-app-search" onSubmit={this.onSubmit} method="POST">
                <Paper elevation={3} className="co2-app-search-container">
                    <InputBase
                        required
                        onChange={this.onChange}
                        value={this.state.country}
                        placeholder="Search by country"
                        className="co2-app-search-input"
                        inputRef={ref => this.inputRef = ref} />
                    <IconButton className="co2-app-search-icon-button" type="submit">
                        <img src={MagnifyIcon} />
                    </IconButton>
                    <Divider style={{
                        width: 1,
                        height: 28,
                        margin: 4,
                    }} />
                    <IconButton className="co2-app-search-icon-button" onClick={this.clearInput}>
                        <img src={CloseIcon} />
                    </IconButton>
                </Paper>
            </form>
        );
    }
}

export default Search;