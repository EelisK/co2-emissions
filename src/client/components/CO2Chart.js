import React from "react";
import { Typography } from "@material-ui/core";
import {
    LineChart,
    Line, XAxis,
    CartesianGrid,
    YAxis, Tooltip,
    Label
} from "recharts";
import titleCase from "../util/titleCase";
import unescapeXML from "../util/unescapeXML";
import theme from "../config/theme";

const CO2Chart = props => {
    // Get dimensions for chart (css doesn't work here)
    const isMobile = window.innerHeight <= 768;
    const width = isMobile ? window.outerWidth * .9 : 700;
    const height = 400;
    const formatCO2Emissions = x => {
        const precision = Number(x.toFixed(2)).toPrecision(6);
        if (precision.match(/e+/) !== null)
            return precision.replace(/.\d+e\+/, "E+");
        return x;
    };
    return (
        <>
            <Typography variant="h5">
                {titleCase(unescapeXML(props.country))}
            </Typography>
            <LineChart width={width} height={height} data={props.data}>
                <XAxis dataKey="year">
                    <Label value="Year" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis dataKey="value" tickFormatter={formatCO2Emissions}>
                    <Label value="CO² emissions in tkg" angle={-90} position="insideBottomLeft" offset={10}/>
                </YAxis> 
                <Line type="monotone" dataKey="value" stroke={theme.palette.secondary.dark} />
                <CartesianGrid stroke={"#CCCCCC"} />
                <Tooltip />
            </LineChart>
        </>
    );
};

export default CO2Chart;