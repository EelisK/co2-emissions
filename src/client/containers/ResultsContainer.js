import { connect } from "react-redux";
import Results from "../components/Results";
import FetchStatus from "../util/FetchStatus";
import groupBy from "../util/groupBy";

const getDataGroups = (data, perCapita) => {
    if (!data)
        return {};
    // Filter out invalid data
    let definedResults = 
        data.filter(x => x.emissions !== null && x.year !== null);

    if (perCapita)
        definedResults = definedResults.map(x => ({ ...x, emissions: 1000 * x.emissions / x.population }));

    // Group by countries
    return groupBy(definedResults, x => x.country);
};

const mapStateToProps = state => {
    return {
        error: state.co2Emissions.status === FetchStatus.Error,
        loading: state.co2Emissions.status === FetchStatus.Pending,
        inactive: state.co2Emissions.status === FetchStatus.Inactive,
        getDataGroups: () => getDataGroups(state.co2Emissions.emissions, state.perCapita)
    }
};

export default connect(mapStateToProps)(Results);