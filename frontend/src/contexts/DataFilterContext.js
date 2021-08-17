import React, { createContext } from "react";
import useFilteredData from "../filter/useFilteredData";

const DataFilterContext = createContext();

function DataFilterProvider({
  children,
  startingShowSessions = false,
  startingEventYear = "2019",
}) {
  const {
    filteredData,
    setSelected,
    projectSelect,
    projectTypeSelect,
    implementerSelect,
    yearSelect,
    countrySelect,
    statusSelect,
    handleFilterSelected
  }= useFilteredData();

  return (
    <DataFilterContext.Provider
      value={{
        filteredData,
        setSelected,
        projectSelect,
        projectTypeSelect,
        implementerSelect,
        yearSelect,
        countrySelect,
        statusSelect,
        handleFilterSelected,
      }}
    >
      {children}
    </DataFilterContext.Provider>
  );
}

export { DataFilterContext, DataFilterProvider };
