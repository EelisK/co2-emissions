import { connect } from "react-redux";
import Results from "../components/Results";
import FetchStatus from "../util/FetchStatus";

const mapStateToProps = state => {
    return {
        error: state.co2Emissions.status === FetchStatus.Error,
        loading: state.co2Emissions.status === FetchStatus.Pending,
        inactive: state.co2Emissions.status === FetchStatus.Inactive,
        data: state.co2Emissions.emissions || {},
        mapData: data => data.filter(x => x.emissions).map(x => {
            if (state.perCapita)
                return { ...x, emissions: x.emissions / x.population }
            return { ...x, emissions: x.emissions * 1e-3 };
        })
    }
};

export default connect(mapStateToProps)(Results);