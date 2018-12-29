import React from "react";
import { Typography, Paper } from "@material-ui/core";
import { LineChart, Line, XAxis, CartesianGrid, YAxis, Tooltip, Label } from "recharts";
import titleCase from "../util/titleCase";
import theme from "../config/theme";
import CO2ChartTooltipContainer from "../containers/CO2GraphTooltipContainer";

const CO2Graph = props => {
    const space = theme.spacing.unit * 2;
    const strokeColor = theme.palette.text.primary;
    // Get dimensions for chart (css doesn't work here)
    const isMobile = window.innerWidth <= 768;
    const width = (isMobile ? window.innerWidth * 0.9 : 700) - space * 2;
    const height = isMobile ? window.innerHeight * .3 : 400;
    return (
        <Paper style={{ padding: space, marginBottom: space }} className="co2-app-chart-container">
            <Typography variant="h5">
                {titleCase(props.country)}
            </Typography>
            <LineChart width={width} height={height} data={props.data}>
                <XAxis dataKey="year" stroke={strokeColor}
                    label={{ value: "year", position: "insideTopRight", dy: -19, fill: strokeColor }} />
                <YAxis dataKey="emissions" stroke={strokeColor}
                    label={{ value: props.yLabel, position: "insideTopRight", dx: 12, fill: strokeColor, angle: -90 }} />
                <Line type="monotone" dataKey="emissions" stroke={theme.palette.secondary.main} />
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.grey.A700} />
                <Tooltip formatter={props.formatEmissions} content={<CO2ChartTooltipContainer />} />
            </LineChart>
        </Paper>
    );
};

export default CO2Graph;