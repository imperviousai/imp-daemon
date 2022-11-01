// general helper functions

export const getApiKey = () => {
  let apiKey = localStorage.getItem("apiKey");
  if (apiKey) {
    return apiKey.replaceAll('"', "");
  } else {
    return "";
  }
};

export const isJSON = (msg) => {
  try {
    let message = JSON.parse(msg);
    if (Object.keys(message).length) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
