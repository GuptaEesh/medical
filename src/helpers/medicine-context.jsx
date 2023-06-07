import { createContext, useContext, useReducer } from "react";
import { toast } from "react-toastify";

const MedicineContext = createContext(null);
const initialData = {
  medications: [],
  history: [],
};
const dataReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MEDICATION":
      if (
        state.medications.some(
          (medication) => medication.name === action.payload
        )
      ) {
        toast.info(`${action.payload} already present`, {
          toastId: "success1",
        });
        return state;
      }
      return {
        ...state,
        medications: [
          ...state.medications,
          { name: action.payload, dosage: [] },
        ],
      };
    case "REMOVE_MEDICATION":
      return {
        ...state,
        medications: state.medications.filter(
          (medication) => medication.name !== action.payload
        ),
      };
    case "ADD_DOSAGE":
      const newMedications = state.medications.map((medication) =>
        medication.name === action.payload.medication
          ? {
              ...medication,
              dosage: [...medication.dosage, action.payload.dosage],
            }
          : medication
      );
      return {
        ...state,
        medications: newMedications,
        history: [
          ...state.history,
          state.medications.find(
            (medication) => medication.name === action.payload.medication
          ),
        ],
      };
    default:
      break;
  }
};
const MedicineContextProvider = ({ children }) => {
  const [data, dispatchData] = useReducer(dataReducer, initialData);
  return (
    <MedicineContext.Provider value={{ data, dispatchData }}>
      {children}
    </MedicineContext.Provider>
  );
};

const useMedicine = () => useContext(MedicineContext);
export { useMedicine, MedicineContextProvider };
