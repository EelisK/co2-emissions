import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import groupBy from "../util/groupBy";
import CO2Chart from "./CO2Chart";

const Results = props => {
    if (props.error)
        return <div>error</div>;
    if (props.loading)
        return (
            <div className="co2-app-center-content">
                <CircularProgress color="primary" style={{ width: 75, height: 75 }} />
            </div>
        );
    if (props.results) {

        // Filter out invalid data
        const definedResults =
            props.results.filter(x => x.emissions !== null && x.year !== null);

        // Group by countries
        const groupedResults = groupBy(definedResults, x => x.country);

        return Object
            .keys(groupedResults)
            .map((country, i) => {
                return (
                    <Grid container wrap="nowrap" key={i}>
                        <Grid item className="co2-app-chart-container">
                            <CO2Chart
                                data={groupedResults[country]}
                                country={country} />
                        </Grid>
                    </Grid>
                );
            });
    }
    return null;
}

export default Results;