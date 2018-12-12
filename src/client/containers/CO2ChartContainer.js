import { connect } from "react-redux";
import CO2Chart from "../components/CO2Chart";

const mapStateToProps = state => {
    return {
        formatEmissions: x => state.perCapita ? x.toFixed(5) : x.toFixed(2),
        yLabel: `CO² emissions in tkg${state.perCapita ? " per capita": ""}`
    }
};

export default connect(mapStateToProps)(CO2Chart);