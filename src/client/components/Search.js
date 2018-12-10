import React from "react";
import { TextField } from "@material-ui/core";

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = { country: "" };
    }

    componentDidUpdate(prevProps) {
        const now = this.props.disabled;
        const then = prevProps.disabled;
        // Check if component has just now become available
        // If it has empty the previous input
        if (!now && now !== then) {
            this.setState({ country: "" });
        }
    }

    onChange(evt) {
        this.setState({ country: evt.target.value });
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.props.fetchEmissions(this.state.country);
    }

    render() {
        return (
            <form className="co2-app-search" onSubmit={this.onSubmit}>
                <TextField
                    label="Search"
                    placeholder="Country eg. Finland"
                    helperText="Search by country name"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    required={true}
                    disabled={this.props.disabled}
                    value={this.state.country}
                    onChange={this.onChange}
                />
            </form>
        );
    }
}

export default Search;