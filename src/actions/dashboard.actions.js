import {FetchData} from "../components/utils/fetch";

export const getUserCount = async () => {
    return async (dispatch) => {
        FetchData("getUsersCount", "GET")
            .then((res) => {
                dispatch({
                    type: "GET_USER_COUNT",
                    payload: res.total
                })
            }
        )
    }
}

