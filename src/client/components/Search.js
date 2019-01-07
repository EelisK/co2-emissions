import React from "react";
import { Divider, IconButton, InputBase, Paper, List, ListItem } from "@material-ui/core";
import theme from "../config/theme";
import titleCase from "../util/titleCase";
import CloseIcon from "../assets/img/close.svg";
import MagnifyIcon from "../assets/img/magnify.svg";

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.state = { country: "", countries: [], activeIdx: null };
    }

    onChange(evt) {
        const nextVal = evt.target.value;   // Used internally
        const trimmedVal = nextVal.trim();  // Used for queries
        this.setState({ country: nextVal, activeIdx: null });
        if (trimmedVal !== "")
            this.props
                .getCountries(trimmedVal)
                .then(countries => countries.slice(0, 7))
                // NOTE: this will cause an error if the component is unmounted
                // but with the current design it shouldn't do that
                .then(countries => this.setState({ countries }));
        else
            this.setState({ countries: [] });
    }

    onKeyDown(evt) {
        const escKeyCode = 27;
        const arrowUpKeyCode = 38;
        const arrowDownKeyCode = 40;
        const prevState = this.state;
        const countryCount = prevState.countries.length;
        let nextIdx;
        if (countryCount === 0)
            return;
        switch (evt.keyCode) {
            case arrowUpKeyCode:
                nextIdx = (prevState.activeIdx || countryCount) - 1;
                break;
            case arrowDownKeyCode:
                nextIdx = (((prevState.activeIdx === null ? -1 : prevState.activeIdx) + 1) % countryCount);
                break;
            case escKeyCode:
                this.setState({ activeIdx: null });
            default:
                return;
        }
        this.setState({ activeIdx: nextIdx, country: prevState.countries[nextIdx] });
    }

    /**
     * Fetch emissions with from the given country/countries
     * @param {*} evt The submit event
     * @param {*} country Country which will be used to fetch the emission data.
     * Default is this.state.country
     */
    onSubmit(evt, country = this.state.country) {
        evt.preventDefault();
        this.setState({ countries: [], country });
        this.props.fetchEmissions(country);
    }

    clearInput() {
        this.setState({ country: "", countries: [] });
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
                        onKeyDown={this.onKeyDown}
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
                <Paper className="co2-app-countries-list-container" elevation={3}>
                    <List className="co2-app-countries-list" style={{ background: theme.palette.background.default }}>
                        {this.state.countries.map((country, idx) => {
                            return (
                                <ListItem button key={country} onClick={evt => this.onSubmit(evt, country)} onKeyDown={this.onKeyDown}
                                    style={{ color: theme.typography.button.color }} selected={this.state.activeIdx === idx}>
                                    {titleCase(country)}
                                </ListItem>
                            );
                        })}
                    </List>
                </Paper>
            </form>
        );
    }
}

export default Search;