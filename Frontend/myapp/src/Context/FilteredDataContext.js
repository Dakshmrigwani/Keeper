import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const FilteredDataContext = createContext();

export const FilteredDataProvider = ({ children }) => {
  const FilteredArray = useSelector((state) => state.note.FilteredArray);
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState(FilteredArray);
  useEffect(() => {
    setFilteredData(FilteredArray)
    console.log("FilteredArray" , FilteredArray);
  }, [FilteredArray]);

  return (
    <FilteredDataContext.Provider value={{ filteredData, setFilteredData }}>
      {children}
    </FilteredDataContext.Provider>
  );
};
