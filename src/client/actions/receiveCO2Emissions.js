import { ReceiveCO2Emissions } from ".";

const receiveCO2Emissions = emissions => {
    return {
        type: ReceiveCO2Emissions,
        emissions
    }
};

export default receiveCO2Emissions;