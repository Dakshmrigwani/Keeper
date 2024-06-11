import React, { createContext, useEffect, useState } from "react";

const LayoutContext = createContext();

const getLayout = () => {
  const storedLayout = localStorage.getItem("LayoutChanger");
  return storedLayout ? storedLayout : "flex-coler";
};

const getJustifier = () => {
  const storedJustifier = localStorage.getItem("LayoutJustifier");
  return storedJustifier ? storedJustifier : "justify-content-center";
};

const getWidther = () => {
    const storedWidther = localStorage.getItem("LayoutWidther");
    return storedWidther ? storedWidther : "mx-60";
  };

const LayoutNote = ({ children }) => {
  const [layout, setLayout] = useState(getLayout);
  const [justify, setJustify] = useState(getJustifier);
  const [widther , setWidther] = useState(getWidther)

  useEffect(() => {
    localStorage.setItem("LayoutChanger", layout);
  }, [layout]);

  useEffect(() => {
    localStorage.setItem("LayoutJustifier", justify);
  }, [justify]);

  useEffect(() => {
    localStorage.setItem("LayoutWidther", widther);
  }, [widther]);

  function toggleLayout() {
    if (layout === "flex-coler") {
      setLayout("flex-row");
    } else {
      setLayout("flex-coler");
    }
  }

  function toggleJustifier() {
    if (justify === "justify-content-center") {
      setJustify("justify-content-start");
    } else {
      setJustify("justify-content-center");
    }
  }

  function toggleWidther() {
    if (widther === "mx-60") {
        setWidther("w-100");
    } else {
        setWidther("mx-60");
    }
  }

  return (
    <LayoutContext.Provider
      value={{
        layout,
        setLayout,
        toggleLayout,
        justify,
        setJustify,
        toggleJustifier,
        toggleWidther,
        widther, 
        setWidther,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export { LayoutNote, LayoutContext };
