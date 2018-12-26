import React from "react";
import { Typography, Paper } from "@material-ui/core";
import { LineChart, Line, XAxis, CartesianGrid, YAxis, Tooltip, Label } from "recharts";
import titleCase from "../util/titleCase";
import unescapeXML from "../util/unescapeXML";
import theme from "../config/theme";
import CO2ChartTooltipContainer from "../containers/CO2GraphTooltipContainer";

const CO2Graph = props => {
    const space = theme.spacing.unit * 2;
    const strokeColor = theme.palette.text.primary;
    // Get dimensions for chart (css doesn't work here)
    const isMobile = window.innerHeight <= 768;
    const width = Math.min((isMobile ? window.innerWidth * 0.9 : 700), 700) - space * 2;
    const height = 400;
    const formatCO2Emissions = x => {
        const precision = Number(x.toFixed(2)).toPrecision(6);
        if (precision.match(/e+/) !== null)
            return precision.replace(/.\d+e\+/, "E+");
        return x;
    };
    return (
        <Paper style={{ padding: space, marginBottom: space }}>
            <Typography variant="h5">
                {titleCase(unescapeXML(props.country))}
            </Typography>
            <LineChart width={width} height={height} data={props.data}>
                <XAxis dataKey="year" stroke={strokeColor} />
                <YAxis dataKey="emissions" stroke={strokeColor} tickFormatter={formatCO2Emissions}>
                    <Label value={props.yLabel} angle={-90} position="insideBottomLeft" fill={strokeColor} offset={8} />
                </YAxis>
                <Line type="monotone" dataKey="emissions" stroke={theme.palette.secondary.main} />
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.primary.light} />
                <Tooltip formatter={props.formatEmissions} content={<CO2ChartTooltipContainer />} />
            </LineChart>
        </Paper>
    );
};

export default CO2Graph;