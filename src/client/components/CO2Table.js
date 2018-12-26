import React from "react";
import {
    Paper, TableBody, TableRow, TableCell, Tooltip,
    TableSortLabel, TableHead, Table, Divider, Typography,
    ExpansionPanel, ExpansionPanelSummary
} from "@material-ui/core";
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

    render() {
        const { key, dir } = this.state.sort;
        return (
            <Paper className="co2-app-data-table-container">
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ArrowUpIcon style={{ transform: "matrix(-1, 0, 0, -1, 0, 0)" }} />}>
                        <Typography variant="subtitle1">
                            {titleCase(unescapeXML(this.props.country))}
                        </Typography>
                    </ExpansionPanelSummary>
                    <Divider />
                    <Table className="co2-app-data-table">
                        <TableHead>
                            <TableRow>
                                {this.props.cells.map((cell, idx) => (
                                    <TableCell key={idx} sortDirection={cell.key === key ? dir : false}>
                                        <Tooltip enterDelay={200} title="Sort">
                                            <TableSortLabel
                                                active={cell.key === key}
                                                onClick={() => this.setSortKey(cell.key)}
                                                direction={dir}>{cell.name}
                                            </TableSortLabel>
                                        </Tooltip>
                                    </TableCell>
                                ))}
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