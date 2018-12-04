import React from "react";
import Search from "./components/Search";
import Results from "./components/Results";
import Header from "./components/Header";
import persistor from "./config/persistor";
import store from "./config/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import PerCapitaContainer from "./containers/PerCapitaContainer";


const Main = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
                <Header />
                <Search />
                <PerCapitaContainer />
                <Results />
            </PersistGate>
        </Provider>
    );
}

export default Main;