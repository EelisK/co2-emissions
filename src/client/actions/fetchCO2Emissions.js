import HttpRequest from "../util/HttpRequest";
import receiveCO2Emissions from "./receiveCO2Emissions";
import failReceiveCO2Emissions from "./failReceiveCO2Emissions";
import getCO2Emissions from "./getCO2Emissions";

const fetchCO2Emissions = country => dispatch => {
    dispatch(getCO2Emissions());
    new HttpRequest(`/api/v1/emissions/${country}`)
        .send()
        .then(x => x.data.record)
        .then(x =>  dispatch(receiveCO2Emissions(x)))
        .catch(x => dispatch(failReceiveCO2Emissions(x)));
};

export default fetchCO2Emissions;