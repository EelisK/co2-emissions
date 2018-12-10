import { connect } from "react-redux";
import Search from "../components/Search";
import fetchCO2Emissions from "../actions/fetchCO2Emissions";
import FetchStatus from "../util/FetchStatus"

const mapStateToProps = state => {
    return {
        disabled: state.co2Emissions.state === FetchStatus.Pending
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchEmissions: country => dispatch(fetchCO2Emissions(country))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);