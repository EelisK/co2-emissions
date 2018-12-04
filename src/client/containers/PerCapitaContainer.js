import { connect } from "react-redux";
import PerCapita from "../components/PerCapita";
import togglePerCapita from "../actions/togglePerCapita";

const mapStateToProps = state => {
    return {
        checked: state.perCapita
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleChecked: () => dispatch(togglePerCapita())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PerCapita);