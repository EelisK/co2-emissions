import { connect } from "react-redux";
import Results from "../components/Results";
import FetchStatus from "../util/FetchStatus";

const mapStateToProps = state => {
    return {
        error: state.co2Emissions.status === FetchStatus.Error,
        loading: state.co2Emissions.status === FetchStatus.Pending,
        inactive: state.co2Emissions.status === FetchStatus.Inactive,
        results: state.co2Emissions.emissions
    }
};

export default connect(mapStateToProps)(Results);