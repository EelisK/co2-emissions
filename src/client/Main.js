import React from "react";
import Header from "./components/Header";
import persistor from "./config/persistor";
import store from "./config/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import PerCapitaContainer from "./containers/PerCapitaContainer";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./config/theme";
import ResultsContainer from "./containers/ResultsContainer";
import SearchContainer from "./containers/SearchContainer";
import ScrollTop from "./components/ScrollTop";
import ChartTypeSelectorContainer from "./containers/ChartTypeSelectorContainer";


const Main = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Header />
                    <div className="co2-app-container">
                        <SearchContainer />
                        <div className="co2-app-chart-options">
                            <PerCapitaContainer />
                            <ChartTypeSelectorContainer />
                        </div>
                        <ResultsContainer />
                    </div>
                    <ScrollTop />
                </PersistGate>
            </Provider>
        </MuiThemeProvider>
    );
}

export default Main;