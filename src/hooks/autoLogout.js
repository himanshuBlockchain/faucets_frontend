import { removeLocalStorage } from "../utils/localStorage";

export const autoLogout = (key, timer) => {
  setTimeout(() => {
    removeLocalStorage(key)
  }, timer);
};
