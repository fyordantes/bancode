import { createContext, useState } from "react";
import Papa from "papaparse";

export const SourceContext = createContext(null);

export const SourceProvider = ({ children }) => {
  const [source, setSource] = useState(Papa.parse(localStorage.getItem("source")) || []);

  const handleSourceChange = (newSource) => {
    localStorage.setItem("source", newSource);
    setSource(Papa.parse(newSource));
  };

  return (
    <SourceContext.Provider value={{ source, handleSourceChange }}>
      {children}
    </SourceContext.Provider>
  );
};
