import { createContext, useContext, useState } from "react";

const ResumeDataContext = createContext();

export const ResumeDataProvider = ({ children }) => {
  const [resumeParsedData, setResumeParsedData] = useState(null);

  return (
    <ResumeDataContext.Provider value={{ resumeParsedData, setResumeParsedData }}>
      {children}
    </ResumeDataContext.Provider>
  );
};

export const useResumeDataContext = () => {
  return useContext(ResumeDataContext);
};