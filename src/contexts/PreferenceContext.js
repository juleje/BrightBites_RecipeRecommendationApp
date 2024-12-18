import React, { createContext, useState } from "react";
export const PreferenceContext = createContext();

const PreferenceContextProvider = (props) => {
  const setPreference = (preference) => {
    setState({ ...state, preference: preference });
  };

  const initState = {
    preference: false,
    setPreference: setPreference,
  };

  const [state, setState] = useState(initState);

  return (
    <PreferenceContext.Provider value={state}>
      {props.children}
    </PreferenceContext.Provider>
  );
};
export default PreferenceContextProvider;
