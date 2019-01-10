import React from "react";
import { connect } from "react-redux";
import Search from "../components/Search";
import fetchCO2Emissions from "../actions/fetchCO2Emissions";
import FetchStatus from "../util/FetchStatus";
import HttpRequest from "../util/HttpRequest";
import titleCase from "../util/titleCase";

/**
 * Handle the country name previews in here
 * and render them in the representational component Search.
 * This is completely fine as long as the Search component never unmounts.
 * If that will ever become necessary this logic should be handled with Redux.
 * @param {*} name String that is matched with the possible countries
 */
const getCountries = name => {
    return new HttpRequest(`/api/v1/countries/${name}`)
        .send()
        .then(x => x.data)
        .then(data => data.map(x => titleCase(x)));
};

const mapStateToProps = state => {
    return {
        disabled: state.co2Emissions.state === FetchStatus.Pending
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchEmissions: country => dispatch(fetchCO2Emissions(country))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(props => <Search {...props} getCountries={getCountries} />);