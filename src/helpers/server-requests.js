import axios from "axios";

export const getMedicinesList = async (query) => {
  const response = await axios.get(
    `https://api.fda.gov/drug/drugsfda.json?search=${query.toUpperCase()}&limit=500`
  );
  const drugs = response.data.results;
  const names = drugs.map((drug) => drug.products[0].brand_name);
  return names;
};
