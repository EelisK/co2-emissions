import ChartType from "../util/ChartType";
import { SetChartType } from "../actions";

const chartType = (state = ChartType.Graph, action) => {
    switch (action.type) {
        case SetChartType:
            return action.chartType;
        default:
            return state;
    }
};

export default chartType;