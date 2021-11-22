import{Roles} from "../common/constants"

export default function authReducer(state, action) {
    const { data } = action;
    switch (action.type) {
        case "login_student":
            //const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
            //localStorage.setItem("expires_at", JSON.stringify(expiresAt));
                // user = res.data
                // role = 'student'
            sessionStorage.setItem("role", Roles.STUDENT)
            sessionStorage.setItem("user", JSON.stringify(data));
            break;
            //return { user, role };
        case "login_teacher":
            //const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
            //sessionStorage.setItem("expires_at", JSON.stringify(expiresAt));
                // user = res.data
                // role = 'teacher'
            sessionStorage.setItem("role", Roles.TEACHER)
            sessionStorage.setItem("user", JSON.stringify(data));
            break;
            //return { user, role };
        case "logout":
            // localStorage.removeItem("expires_at");
            // sessionStorage.removeItem("role");
            // sessionStorage.removeItem("user");
            sessionStorage.clear()
            break;
            //return { user: {}, role: '' };
        default:
            //return state;
    }
    let user = JSON.parse(sessionStorage.getItem('user'))
    let role = sessionStorage.getItem('role')
    return { user, role }
  }