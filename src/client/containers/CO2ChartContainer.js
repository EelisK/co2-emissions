import { connect } from "react-redux";
import CO2Chart from "../components/CO2Chart";

const mapStateToProps = state => {
    return {
        chartType: state.chartType
    }
};

export default connect(mapStateToProps)(CO2Chart);