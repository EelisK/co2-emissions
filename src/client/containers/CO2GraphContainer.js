import { connect } from "react-redux";
import CO2Graph from "../components/CO2Graph";

const mapStateToProps = state => {
    return {
        formatEmissions: x => x.toFixed(state.perCapita ? 5 : 2),
        yLabel: `CO2 (${state.perCapita ? "kg per capita" : "10³kg"})`
    }
};

export default connect(mapStateToProps)(CO2Graph);