"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

interface IUiContext {
  isSideBarVisible: boolean;
  isNavbarVisible: boolean;
  isPageLoaderVisible: boolean;
  setIsSideBarVisible: Dispatch<SetStateAction<boolean>>;
  setIsNavbarVisible: Dispatch<SetStateAction<boolean>>;
  setIsPageLoaderVisible: Dispatch<SetStateAction<boolean>>;
}

const defaultValues = {
  isSideBarVisible: false,
  isNavbarVisible: false,
  isPageLoaderVisible: false,
  setIsSideBarVisible: () => {},
  setIsNavbarVisible: () => {},
  setIsPageLoaderVisible: () => {},
};

export const UiContext = createContext<IUiContext>(defaultValues);

export function UiContextProvider({ children }: { children: ReactNode }) {
  const [isSideBarVisible, setIsSideBarVisible] = useState<boolean>(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(false);
  const [isPageLoaderVisible, setIsPageLoaderVisible] =
    useState<boolean>(false);

  const value = useMemo(
    () => ({
      isSideBarVisible,
      setIsSideBarVisible,
      isNavbarVisible,
      setIsNavbarVisible,
      isPageLoaderVisible,
      setIsPageLoaderVisible,
    }),
    [isSideBarVisible, isNavbarVisible, isPageLoaderVisible]
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}
export function useUiContext() {
  return useContext(UiContext);
}
