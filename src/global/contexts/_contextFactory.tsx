import React, {
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  createContext,
  useContext,
} from "react";

type ContextFactoryType<T> = [T, Dispatch<SetStateAction<T>>];

export const createCustomContext = <T,>(initialState: T) => {
  const Context = createContext<ContextFactoryType<T> | null>(null);

  const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState(initialState);

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
