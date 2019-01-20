import React from "react";
import { Divider, IconButton, InputBase, Paper, List, ListItem, Typography } from "@material-ui/core";
import theme from "../config/theme";
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

    /**
     * Handles input navigation (arrows up and down + esc).
     * @param {*} evt The keyDown event
     */
    onKeyDown(evt) {
        const escKeyCode = 27;
        const arrowUpKeyCode = 38;
        const arrowDownKeyCode = 40;
        const { activeIdx, countries } = this.state;
        const countryCount = countries.length;
        let nextIdx;
        if (countryCount === 0)
            return;
        switch (evt.keyCode) {
            // Go down the list or exit it
            case arrowUpKeyCode:
                if (activeIdx === null)
                    nextIdx = countryCount - 1;
                else if (activeIdx === 0)
                    nextIdx = null;
                else
                    nextIdx = activeIdx - 1;
                break;
            // Go up the list or exit it
            case arrowDownKeyCode:
                if (activeIdx === null)
                    nextIdx = 0;
                else if (activeIdx === countryCount - 1)
                    nextIdx = null;
                else
                    nextIdx = activeIdx + 1;
                break;
            // Take the focus away from the list item (and terminate)
            case escKeyCode:
                this.setState({ activeIdx: null });
            default:
                return;
        }
        this.setState({ activeIdx: nextIdx });
    }

    /**
     * Fetch emissions with from the given country/countries
     * @param {*} evt The submit event
     * @param {*} co Optional parameter. Can be used to override the default country value from the state.
     * This comes in handy with the list onClick function.
     */
    onSubmit(evt, co) {
        evt.preventDefault();
        const { activeIdx, countries, country } = this.state;
        const selectedCountry = co || (activeIdx === null ? country : countries[activeIdx]);
        this.setState({ countries: [], country: selectedCountry, activeIdx: null });
        this.props.fetchEmissions(selectedCountry);
    }

    clearInput() {
        this.setState({ country: "", countries: [], activeIdx: null });
        this.inputRef && this.inputRef.focus();
    }

    /**
     * Render name so that the matching
     * part of the name will be highlighted
     * @param {*} name The name that will be compared to state.country
     */
    renderSuggestion(name) {
        const trim = str => str.replace(/\s+/g, " ").toLowerCase().trim();
        const country = trim(this.state.country);
        const trimmedName = trim(name);
        const match = trimmedName.match(country);
        if (match === null)
            return name;
        const
            first  = name.slice(0, match.index),
            second = name.slice(match.index, match.index + match[0].length),
            third  = name.slice(match.index + match[0].length, name.length);
        return (
            <>
                <span>{first}</span>
                <span className="co2-app-autosuggest-match">{second}</span>
                <span>{third}</span>
            </>
        );
    }

    render() {
        const { activeIdx, country, countries } = this.state;
        return (
            <form className="co2-app-search" onSubmit={this.onSubmit} method="POST">
                <Paper elevation={3} className="co2-app-search-container">
                    <InputBase
                        required
                        onChange={this.onChange}
                        value={activeIdx === null ? country : countries[activeIdx]}
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
                <Paper className="co2-app-autosuggest-container" elevation={3}>
                    <List className="co2-app-autosuggest" style={{ background: theme.palette.background.default }}>
                        {countries.map((country, idx) => {
                            return (
                                <ListItem button key={country} onClick={evt => this.onSubmit(evt, country)} onKeyDown={this.onKeyDown}
                                    style={{ color: theme.typography.button.color }} selected={activeIdx === idx}>
                                    <Typography variant="subtitle1">
                                        {this.renderSuggestion(country)}
                                    </Typography>
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