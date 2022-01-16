import { createContext, useState } from "react";
import MessageBox from "../components/MessageBox";
export const UtilityContext = createContext();
export const UtilityProvider = ({ children }) => {
  const [showMessageBox, setShowMessageBox] = useState([false, null]);
  const dataValue = {
    showToast(message) {
      setShowMessageBox([true, message]);
    },
    isURL(str) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      console.log(str, !!pattern.test(str));
      return !!pattern.test(str);
    },
    themes: [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
      "info",
      "dark",
    ],
  };
  return (
    <UtilityContext.Provider value={dataValue}>
      {children}
      <MessageBox
        title="Link Manager"
        message={showMessageBox[1]}
        show={showMessageBox[0]}
        onHide={() => setShowMessageBox([false, null])}
      />
    </UtilityContext.Provider>
  );
};