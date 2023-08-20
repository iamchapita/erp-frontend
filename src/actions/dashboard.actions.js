import {FetchData} from "../components/utils/fetch";
import {types} from "../types/types";

export const getUserCount =  (token) => {
    return async (dispatch) => {
        FetchData("user/getUsersCount/", token).then((response) => {
            dispatch(dispatchGetUserCount(response))
            }
        )
    }
}

export const dispatchGetUserCount = (userCount) => {
    return {
        type: types.getUserCount,
        payload: userCount
    }
}
