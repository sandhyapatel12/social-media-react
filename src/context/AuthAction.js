//includes all functions which needed in AuthReducer

export const LoginStart = () => ({
    type: "LOGIN_START",
  });
  
export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,      //return user data
  });
  
  export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
  });
  
  export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
  });
  
  export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
  });
  