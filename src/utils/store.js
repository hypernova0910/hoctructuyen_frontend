import React, {useState} from 'react';

export const StoreContext = React.createContext(null);

export default ({ children }) => {
    //Ẩn hiện icon loading
    const [loading, setLoading] = useState(false)

    //Lưu trữ lỗi đăng nhập
    const [loginErrorMsg, setLoginErrorMsg] = useState('')

    const store = {
        // roleContext: [role, setRole],
        // idContext: [id, setId],
        // usernameContext: [username, setUsername]
        loadingContext: [loading, setLoading],
        loginErrorMsgContext: [loginErrorMsg, setLoginErrorMsg]
    };

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};