import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useMedicine } from "../helpers/medicine-context";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import { MedicineSearch } from "../components/MedicineSearch";

const MedicationRemind = () => {
  const [newMedication, setNewMedication] = useState("");
  const [newDosage, setNewDosage] = useState("");
  const {
    data: { medications, history },
    dispatchData,
  } = useMedicine();
  useEffect(() => {
    const reminderInterval = setInterval(() => {
      checkMedicationReminders();
    }, 50000);
    return () => clearInterval(reminderInterval);
  }, []);

  const addMedication = () => {
    if (newMedication.trim() !== "") {
      dispatchData({ type: "ADD_MEDICATION", payload: newMedication });
      setNewMedication("");
    }
  };

  const removeMedication = (medication) => {
    dispatchData({ type: "REMOVE_MEDICATION", payload: medication });
  };

  const addDosage = (medication) => {
    if (newDosage.trim() !== "") {
      dispatchData({
        type: "ADD_DOSAGE",
        payload: { medication, dosage: newDosage },
      });
      setNewDosage("");
    }
  };

  const checkMedicationReminders = () => {
    const now = new Date();
    medications.forEach((medication) => {
      medication.dosage.forEach((dosage) => {
        const dosageTime = new Date(dosage);
        if (dosageTime <= now) {
          notifyMedicationReminder(medication.name);
        }
      });
    });
  };

  const notifyMedicationReminder = (medication) => {
    toast.info(`Reminder: Take ${medication}`, {
      toastId: "success1",
    });
  };

  return (
    <div className="medication-reminder-container">
      <ToastContainer />
      <h2>Medication Reminder</h2>
      <div className="input-container">
        <MedicineSearch
          newMedication={newMedication}
          setNewMedication={setNewMedication}
        />
        <button className="add-button" onClick={addMedication}>
          Add Medication
        </button>
      </div>
      <div className="wrapper">
        <div className="medication-history-container">
          <h2>History</h2>
          <ul className="history-list">
            {!history.length ? (
              <small>No medication history as of today</small>
            ) : (
              history?.map((medication, index) => (
                <li key={index} className="history-item">
                  {medication.name}
                  <button className="more-button">More..</button>
                </li>
              ))
            )}
          </ul>
        </div>
        <ul className="medication-list">
          <h2>Medication List</h2>
          {!medications.length ? (
            <small>No medications added</small>
          ) : (
            medications?.map((medication, index) => (
              <li key={index} className="medication-item">
                <section className="medication-section">
                  <strong>{medication.name}</strong>
                  <button
                    className="remove-button"
                    onClick={() => removeMedication(medication.name)}
                  >
                    Remove
                  </button>
                </section>

                <div className="dosage-container">
                  <input
                    type="datetime-local"
                    value={newDosage}
                    onChange={(e) => setNewDosage(e.target.value)}
                    placeholder="Dosage Time"
                  />
                  <button
                    className="add-dosage-button"
                    onClick={() => addDosage(medication.name)}
                  >
                    Select Dosage
                  </button>
                </div>
                <ul className="dosage-list">
                  {medication.dosage?.map((dosage, dosageIndex) => (
                    <li key={dosageIndex} className="dosage-item">
                      {dosage.split("T")[0]} <b>Time: {dosage.split("T")[1]}</b>
                    </li>
                  ))}
                </ul>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export { MedicationRemind };
