export const API_KEY = "AIzaSyB0hta8MAHN6e9RuZoL7Dte8EHuhRIK6pw";
export const value_converter = (value) => {
  if (value >= 1000000) {
    return Math.floor(value / 1000000) + "M";
  } else if (value >= 1000) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
  }
};
