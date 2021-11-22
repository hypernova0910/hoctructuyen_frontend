import React, {useReducer} from 'react';
import authReducer from "./authReducer";

export const AuthContext = React.createContext(null);

export default ({ children }) => {
  // khởi tạo
  //alert(1)
  const initData = {
      user: JSON.parse(sessionStorage.getItem('user')),
      role: sessionStorage.getItem('role')
  }
  const [state, dispatch] = useReducer(authReducer, initData);
//   const reducer = {
//     state: state,
//     dispatch: dispatch
//   }
  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};