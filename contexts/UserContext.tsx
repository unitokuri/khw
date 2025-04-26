import { useState, createContext } from "react";

interface UserContextValue {
  numberOfPeople: number;
  hasChild: boolean;
  hasSenior: boolean;
}

interface UserContext {
  userContextValue: UserContextValue;
  updateUserContextValue: (value: Partial<UserContextValue>) => void;
}

const initialUserContextValue: UserContextValue = {
  numberOfPeople: 0,
  hasChild: false,
  hasSenior: false,
};

export const UserContext = createContext<UserContext>({
  userContextValue: initialUserContextValue,
  updateUserContextValue: (value: Partial<UserContextValue>) => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userContextValue, setUserContextValue] = useState<UserContextValue>(
    initialUserContextValue
  );

  const updateUserContextValue = (value: Partial<UserContextValue>) => {
    setUserContextValue((userContextValue) => ({
      ...userContextValue,
      ...value,
    }));
  };

  return (
    <UserContext.Provider value={{ userContextValue, updateUserContextValue }}>
      {children}
    </UserContext.Provider>
  );
};
