import SalesDemo from "./SalesDemo";
import TitanicDemo from "./TitanicDemo";

// Interactive demos, keyed by project title as stored in the database
const demos = {
  "Sales Forecasting Dashboard": { label: "Explore the dashboard", component: SalesDemo },
  "Kaggle Titanic Survival Prediction Project": { label: "Would you have survived?", component: TitanicDemo },
};

export default demos;
