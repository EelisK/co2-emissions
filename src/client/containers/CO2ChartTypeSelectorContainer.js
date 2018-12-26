import { connect } from "react-redux";
import ChartTypeSelector from "../components/ChartTypeSelector";
import setChartType from "../actions/setChartType";
import ChartType from "../util/ChartType";

const getTypeName = type => {
    switch(type) {
        case ChartType.Graph:
            return "graph";
        case ChartType.Table:
            return "table";
        default:
            return null;
    }
}

const mapStateToProps = state => {
    return {
        type: getTypeName(state.chartType)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setType: type => dispatch(setChartType(type))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartTypeSelector);