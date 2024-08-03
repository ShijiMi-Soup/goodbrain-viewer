import React, { useState, ReactNode, createContext, useContext } from "react";

type CustomContext<T> = [T, (newState: T) => void];

export const createCustomContext = <T,>(
  initialState: T,
  isNewStateValid?: (newState: T) => boolean
) => {
  const Context = createContext<CustomContext<T> | null>(null);

  const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, _setState] = useState(initialState);

    const setState = (newState: T) => {
      if (isNewStateValid && !isNewStateValid(newState)) {
        return;
      }

      _setState(newState);
    };

    return (
      <Context.Provider value={[state, setState]}>{children}</Context.Provider>
    );
  };

  const useCustomContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error(
        `${Context.displayName} must be used within a ${Context.displayName}Provider`
      );
    }
    return context;
  };

  return { Context, ContextProvider, useCustomContext };
};
