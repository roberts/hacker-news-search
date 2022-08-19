import { createContext, useContext, useMemo, useState } from "react";

const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
  const [state, setState] = useState([]);

  const value = useMemo(() => {
    return { state, setState };
  }, [state, setState]);

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
};

const useHistory = () => {
  const { state = [], setState } = useContext(HistoryContext);

  const addHistory = (query, type) => {
    setState([
      {
        id: `ID_${Date.now()}`,
        query,
        type,
      },
      ...state,
    ]);
  };

  return {
    addHistory,
    histories: state,
  };
};

export { useHistory, HistoryProvider };
