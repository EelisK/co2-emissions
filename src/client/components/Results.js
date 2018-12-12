import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import CO2ChartContainer from "../containers/CO2ChartContainer";

const Results = props => {
    if (props.error)
        return <div>error</div>;
    if (props.loading)
        return (
            <div className="co2-app-center-content">
                <CircularProgress color="primary" style={{ width: 75, height: 75 }} />
            </div>
        );
    const groups = props.getDataGroups();
    return Object
        .keys(groups)
        .map((country, i) => {
            return (
                <Grid container wrap="nowrap" key={i}>
                    <Grid item className="co2-app-chart-container">
                        <CO2ChartContainer
                            data={groups[country]}
                            country={country} />
                    </Grid>
                </Grid>
            );
        });
}

export default Results;