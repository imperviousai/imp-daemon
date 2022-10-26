import { getItem, setItem } from "./kv";

const DEFAULT_SETTINGS = JSON.stringify({
  messages: { openInbox: true },
  identity: { nickname: "" },
});
export const initSettings = () => {
  getItem("settings")
    .then((res) => {
      if (!res.data.value) {
        console.log(
          "no settings found. need to set a boilerplate settings template"
        );
        return setItem({ key: "settings", value: DEFAULT_SETTINGS });
      }
    })
    .catch(() => "Unable to set initial settings: ");
};
