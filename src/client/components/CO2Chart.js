import React from "react";
import ChartType from "../util/ChartType";
import CO2GraphContainer from "../containers/CO2GraphContainer";
import CO2TableContainer from "../containers/CO2TableContainer";

/**
 * Render the correct chart according to the chartType
 * @param {*} props object containing the chartType
 * and own props of the specific chart
 */
const CO2Chart = ({ chartType, ...props }) => {
    switch (chartType) {
        case ChartType.Graph:
            return <CO2GraphContainer {...props} />;
        case ChartType.Table:
            return <CO2TableContainer {...props} />;
        default:
            return null;
    }
};

export default CO2Chart;