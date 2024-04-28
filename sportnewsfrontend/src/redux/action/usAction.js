import actionType from './actiontype'

export const usLoginSuccess = (user) => ({
    type: actionType.LOGIN_SUCCESS, 
    usSuccess: user
})

export const usLoginFail = () => ({
    type: actionType.LOGIN_FAIL 
})

export const usUpdateSuccess = (newUser) => ({
    type: actionType.UPDATE_SUCCESS,
    usUpdate: newUser,
})

export const usUpdateFailed = () => ({
    type: actionType.UPDATE_FAILED
}) 

export const usLogout =() =>({
    type: actionType.LOGOUT
})