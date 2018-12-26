import React from "react";
import CO2Table from "../components/CO2Table";
import { connect } from "react-redux";

/**
 * Sorts the data according to the key and direction
 * @param {*} data array that is sorted
 * @param {*} key key used for sorting
 * @param {*} dir direction of sort ("asc" or "desc")
 */
const sortData = (data, precision, key, dir) => {
    const sign = dir === "asc" ? 1 : -1;
    return data
        .sort((a, b) => sign * (a[key] - b[key]))
        .map(({ emissions, ...data }) => (
            { ...data, emissions: emissions && emissions.toFixed(precision) }
        ));
};

const mapStateToProps = state => {
    return {
        precision: state.perCapita ? 6 : 3,
        cells: [
            {
                name: "year",
                key: "year"
            },
            {
                name: "emissions (" + (state.perCapita ? "kg per-capita" : "tkg") + ")",
                key: "emissions"
            },
            {
                name: "population",
                key: "population"
            },
        ]
    }
};

/**
 * Component that separates the table into 
 * a dummy and a container component
 * @param {*} param0 table props + extra
 * container spesific props
 */
const CO2TableContainer = ({data, precision, ...props}) => {
    return <CO2Table {...props} data={(key, dir) => sortData(data, precision, key, dir)} />;
};

export default connect(mapStateToProps)(CO2TableContainer);