import {PropsWithChildren, createContext, useContext, useState} from 'react';

type AuthProviderContext = {
  isAuth: boolean;
  changeAuth: (value: boolean) => void;
};
const AuthContext = createContext<AuthProviderContext>({
  isAuth: false,
  changeAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props: PropsWithChildren) => {
  const [isAuth, setAuth] = useState(false);

  const changeAuth = (value: boolean) => setAuth(value);

  return (
    <AuthContext.Provider value={{changeAuth, isAuth}}>
      {props.children}
    </AuthContext.Provider>
  );
};
