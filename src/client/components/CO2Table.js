import React from "react";
import { Paper, TableBody, TableRow, TableCell, Tooltip, TableSortLabel, TableHead, Table, Toolbar, Divider, Typography, ExpansionPanel, ExpansionPanelSummary } from "@material-ui/core";
import theme from "../config/theme";
import titleCase from "../util/titleCase";
import unescapeXML from "../util/unescapeXML";
import ArrowUpIcon from "./ArrowUpIcon";


class CO2Table extends React.Component {

    constructor(props) {
        super(props);
        /**
         * Possible sort.key values:
         * [ "year", "emissions", "population" ]
         * Possible sort.dir values:
         * [ "asc", "desc" ]
         */
        this.state = {
            sort: {
                key: "year",
                dir: "asc"
            }
        };
    }

    setSortKey(key) {
        this.setState(prevState => {
            const prevKey = prevState.sort.key;
            const prevDir = prevState.sort.dir;
            return { sort: { key, dir: prevDir === "asc" && prevKey === key ? "desc" : "asc" } };
        });
    }

    renderHeadCell(key) {
        const currKey = this.state.sort.key;
        const currDir = this.state.sort.dir;
        return (
            <TableCell sortDirection={currKey === key ? currDir : false}>
                <Tooltip enterDelay={200} title="Sort">
                    <TableSortLabel
                        active={currKey === key}
                        onClick={() => this.setSortKey(key)}
                        direction={currDir}>{key}
                    </TableSortLabel>
                </Tooltip>
            </TableCell>
        );
    }

    render() {
        const { key, dir } = this.state.sort;
        return (
            <Paper style={{ marginBottom: theme.spacing.unit * 2 }}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ArrowUpIcon style={{ transform: "matrix(-1, 0, 0, -1, 0, 0)" }} />}>
                        <Typography variant="subtitle1">
                            {titleCase(unescapeXML(this.props.country))}
                        </Typography>
                    </ExpansionPanelSummary>
                    <Divider />
                    <Table>
                        <TableHead>
                            <TableRow>
                                {this.renderHeadCell("year")}
                                {this.renderHeadCell("emissions")}
                                {this.renderHeadCell("population")}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.data(key, dir).map((item, index) => {
                                return (
                                    <TableRow hover key={index}>
                                        <TableCell numeric>{item.year}</TableCell>
                                        <TableCell numeric>{item.emissions}</TableCell>
                                        <TableCell numeric>{item.population}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </ExpansionPanel>
            </Paper>
        );
    }
};

export default CO2Table;