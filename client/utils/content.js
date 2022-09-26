import { draftStore } from "../stores/peers";

export const updateDocTitle = (title, id) => {
  draftStore
    .getItem(id)
    .then((doc) => {
      if (doc) {
        return draftStore.setItem(id, {
          ...doc,
          title,
        });
      } else {
        return draftStore.setItem(id, {
          title,
        });
      }
    })
    .catch((err) => console.log(err));
};
