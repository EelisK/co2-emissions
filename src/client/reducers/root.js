import perCapita from "./perCapita";
import co2Emissions from "./co2Emissions"
import chartType from "./chartType"
import { combineReducers } from "redux";

export default combineReducers({ perCapita, co2Emissions, chartType });