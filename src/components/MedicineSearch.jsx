import { useEffect, useState } from "react";
import { SuggestionBox } from "./SuggestionBox";
import "../App.css";
import { getMedicinesList } from "../helpers/server-requests";

export const MedicineSearch = ({ newMedication, setNewMedication }) => {
  const [medicineNames, setMedicineNames] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    const dataTimer = setTimeout(() => {
      (async () => {
        if (newMedication.trim()) {
          try {
            const response = await getMedicinesList(newMedication);
            setMedicineNames(response);
          } catch {
            setMedicineNames([]);
          }
        } else {
          setMedicineNames([]);
        }
      })();
    }, 500);
    return () => clearTimeout(dataTimer);
  }, [newMedication]);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setNewMedication(query);
    setShowSuggestions(true);
  };

  return (
    <div>
      <section className="medicine-search-input">
        <input
          type="text"
          placeholder="Enter a medicine name"
          value={newMedication}
          onChange={handleSearchChange}
        />

        <SuggestionBox
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          setNewMedication={setNewMedication}
          medicineNames={medicineNames}
        />
      </section>
    </div>
  );
};
