const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,     //when first time login process start user also null
                isFetching: true,       //fetching user process start
                isError: false,         //when fetching user process start not any error accure
            }

        case "LOGIN_SUCCESS":
            return {
                user: action.payload,   //if login success then return user data  -- action.payload includes user data
                isFetching: false,      //user data recieved successfully then close  fetching process
                isError: false,     //user data recieved successfully then not any error accure
            }

        case "LOGIN_FAILURE":
            return {
                user: null,     //if accure any error to login process then user not received
                isFetching: false,   //after accure error close  fetching process
                isError: true,      //also show error
            }

        case "FOLLOW":
            return {
                ...state,   //already define state stay as it is
                user:
                {
                    ...state.user,
                    following: [...state.user.following, action.payload]
                }
            }
            
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    following: state.user.following.filter(
                        (following) => following !== action.payload
                    ),
                },
            };

        default:
            return state;
    }
}
export default AuthReducer
