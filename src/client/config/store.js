import root from "../reducers/root";

import { applyMiddleware, compose, createStore } from "redux";
import { persistReducer } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage";

/**
 * Use redux devtools only in development
 */
const composeEnhancers =
    process.env.NODE_ENV === "development" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const persistConfig = {
    key: "root",
    storage,
    whitelist: [
        "perCapita"
    ]
};

const persistedReducer = persistReducer(persistConfig, root);

const store = createStore(
    persistedReducer,
    composeEnhancers(
        applyMiddleware(thunkMiddleware)
    )
);

export default store;