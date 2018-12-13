import { connect } from "react-redux";
import CO2ChartTooltip from "../components/CO2ChartTooltip";

const mapStateToProps = state => {
    return {
        format: x => `${x.toFixed(state.perCapita ? 4 : 0)} ${state.perCapita ? "kg PC": "10³kg"}`
    }
};

export default connect(mapStateToProps)(CO2ChartTooltip);