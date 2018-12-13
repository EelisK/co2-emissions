import React from "react";
import { Paper, Typography, Divider } from "@material-ui/core";
import theme from "../config/theme";

const CO2ChartTooltip = props => {
    const { payload, label, active } = props;
    const itemClassName = "co2-app-chart-tooltip-item";
    if (active)
        return (
            <Paper className="co2-app-chart-tooltip">
                <Typography variant="caption" className={itemClassName}>
                    {label}
                </Typography>
                <Divider style={{ background: theme.palette.primary.main }} />
                {payload && payload.map((x, i) => (
                    <Typography variant="subtitle1" className={itemClassName} key={i}>
                        {props.format(x.payload.emissions)}
                    </Typography>
                ))}
            </Paper>
        );
    return null;
};

export default CO2ChartTooltip;