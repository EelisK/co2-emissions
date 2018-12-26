import { SetChartType } from "./";

const setChartType = chartType => {
    return {
        type: SetChartType,
        chartType
    }
};

export default setChartType;