import { types } from "../types/types";

export const uiSetError = (err) => (
    {
        type: types.uiSetError,
        payload: err
    }
)
export const uiRemoveError = () => (
    {
        type: types.uiRemoveError,
    }
)

export const uiStartLoading = () => ({
    type: types.uiStartLoading
})

export const uiFinishLoading = () => ({
    type: types.uiFinishLoading
})


export const changeTab = (tab) => ({
    type: types.currentTab,
    payload: tab
})
