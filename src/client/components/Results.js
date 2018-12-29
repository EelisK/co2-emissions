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
    return props.countries
        .map((country, i) => {
            const data = props.mapData(country.data);
            if (data.length === 0)
                return null;
            return (
                <Grid container wrap="nowrap" key={i}>
                    <Grid item>
                        <CO2ChartContainer
                            data={data}
                            country={country.name} />
                    </Grid>
                </Grid>
            );
        });
}

export default Results;