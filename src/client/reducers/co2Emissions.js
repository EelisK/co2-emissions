import {
    GetCO2Emissions,
    ReceiveCO2Emissions,
    FailReceiveCO2Emissions
} from "../actions";
import FetchStatus from "../util/FetchStatus";

const co2Emissions = (state = { status: FetchStatus.Inactive }, action) => {
    switch (action.type) {
        case GetCO2Emissions:
            return { status: FetchStatus.Pending };
        case ReceiveCO2Emissions:
            return {
                emissions: action.emissions,
                status: FetchStatus.Inactive
            };
        case FailReceiveCO2Emissions:
            return { status: FetchStatus.Error };
        default:
            return state;
    }
};

export default co2Emissions;