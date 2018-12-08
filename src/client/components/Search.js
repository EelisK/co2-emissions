import React from "react";
import { TextField } from "@material-ui/core";

class Search extends React.Component {
    render() {
        return (
            <form className="co2-app-search">
                <TextField
                    label="Search"
                    placeholder="Country eg. Finland"
                    helperText="Search by country name"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />
            </form>
        );
    }
}

export default Search;