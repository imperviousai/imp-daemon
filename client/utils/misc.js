// general helper functions

export const getApiKey = () => {
  let apiKey = localStorage.getItem("apiKey");
  if (apiKey) {
    return apiKey.replaceAll('"', "");
  } else {
    return "";
  }
};
