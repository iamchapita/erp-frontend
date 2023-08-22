import addNotification from "react-push-notification";
import { FetchData } from "../components/utils/fetch"
import { adminTypes } from "../types/admin.types";

export const getAllUsers = (accessToken)=> {
    return async (dispatch) => {
        FetchData('user/getUsers', accessToken, 'GET')
            .then((data) => {
                dispatch({
                    type: adminTypes.GET_USERS,
                    payload: data,
                })
            }
            )
    }
}

export const updateUserRole = (accessToken, uid, role) => {
    return async (dispatch) => {
        FetchData('user/updateUserRole', accessToken, 'PATCH', { uid, role })
            .then((data) => {
                dispatch({
                    type: adminTypes.UPDATE_USER_ROLE,
                    payload: data,
                })
            }
            )
    }
}


export const userActiveAction = (user) => {
    user = {
        ...user,
        userStatus: (user.userStatus === "Activo" || user.userStatus === 1) ? user.userStatus = 1 : user.userStatus = 0,
    }
    return {
        type: adminTypes.USER_ACTIVE,
        payload: user,
    }
}


export const getRolesAction = (accessToken) => {
    return async (dispatch) => {
        FetchData('user/getRoles', accessToken, 'GET')
            .then((data) => {
                dispatch({
                    type: adminTypes.GET_ROLES,
                    payload: data,
                })
            }
            )
    }
}


export const updateRole = ( currentUser) => {
    return async (dispatch, getState) => {
        const { roles } = getState().user;
        const { accessToken } = getState().auth;
        const { uid, userRole, userStatus: status } = currentUser;
        const {id : idUserRoleFK} = roles.find((roleObject) => roleObject.name === userRole);
        
        FetchData('user/updateUser', accessToken, 'PATCH', { uid, idUserRoleFK, status })
            .then((data) => {
               if( data.affectedRows > 0 )  {
                dispatch(getAllUsers(accessToken));
                dispatch(getRolesAction(accessToken))

            }  else {
                console.log('Error al actualizar el rol');
                //Notifiacion con service worker
                Notification.permission === "granted" && addNotification({
                    title: "Error al actualizar el rol",
                    message: "No se pudo actualizar el rol del usuario",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });

            }
            }
            )
    }
}
