import "./App.css";
import { MedicationRemind } from "./Pages/MedicationRemind";
import { MedicineContextProvider } from "./helpers/medicine-context";

function App() {
  return (
    <div className="App">
      <MedicineContextProvider>
        <MedicationRemind />
      </MedicineContextProvider>
    </div>
  );
}

export default App;
