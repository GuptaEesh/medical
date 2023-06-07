import "../App.css";
const SuggestionBox = ({
  showSuggestions,
  setShowSuggestions,
  medicineNames,
  setNewMedication,
  page,
  setPage,
}) => {
  const handleMedication = (name) => {
    setNewMedication(name);
    setShowSuggestions(false);
  };
  if (!showSuggestions) {
    return <ul></ul>;
  }

  return (
    <>
      <ul className="medicine-suggestion-container">
        {medicineNames?.map((name, index) => (
          <li key={index} onClick={() => handleMedication(name)}>
            {name}
          </li>
        ))}
      </ul>
    </>
  );
};

export { SuggestionBox };
