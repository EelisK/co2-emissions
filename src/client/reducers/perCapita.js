import { TogglePerCapita } from "../actions";

const perCapita = (state = false, action) => {
    switch (action.type) {
        case TogglePerCapita:
            return !state;
        default:
            return state;
    }
}

export default perCapita;