import { createContext, useContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import axios from "axios";

//create context api
const AuthContext = createContext();

//set object into initialState
// set all initialState data into state 
const initialState = {
    // user: {
    //     _id: "66b06538e8b7ba00f048678d",
    //     username: "payal12",
    //     email: "payal12@gmail.com",
    //     password: "$2a$10$dVvfFqW2eXM.WG8pTx8FuO.uIXHgKqdajRodkF/opZw5lrWobNzEq",
    //     profilePicture: "person/2.jpeg",
    //     coverPicture: "",
    //     followers: [],
    //     following: [],
    //     isAdmin: false,
    // },
    user: null,
    isFetching: false,
    iserror: false,
    followers: [],
    following: [],

}

//create Provider
const AuthProvider = ({ children }) => {

    //dispatch give order to action for do work as per instuctions -- action pass as a argument at ProductReducer function
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    // const loginCall = async (userCredentials, dispatch) => {
    //     dispatch({ type: "LOGIN_START" })

    //     try {
    //         // starting path of api includes at package,json in proxy string http://localhost:5000/api
    //         const response = await axios.post("/auth/login", userCredentials)
    //         dispatch({ type: "LOGIN_SUCCESS", payload: response.data });     //if login sucess then send response(response.data includes user data)
    //         // console.log(response.data);

    //     } catch (error) {
    //         dispatch({ type: "LOGIN_FAILURE", payload: error });
    //     }
    // }

    // set all initialState data into state and passing value through that data
    return (<AuthContext.Provider value={{
        user: state.user,
        isFetching: state.isFetching,
        iserror: state.iserror,
        dispatch
    }}>
        {children}
    </AuthContext.Provider>)
}

//custom hook
const useCustomAuth = () => {
    return useContext(AuthContext)
}
export { useCustomAuth, AuthProvider };