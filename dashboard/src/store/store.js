import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import forgetResetPasswordReducer from "./slices/forgetResetPasswordSlice"
import  resetMessagesReducer  from "./slices/messageSlice"
import timelineReducer from "./slices/timelineSlice"
import skillReducer from "./slices/skillSlice"
import softwareApplicationsReducer  from "./slices/applicationSlice"
import ProjectReducer from "./slices/projectSlice"

export const store = configureStore({
    reducer:{
        user: userReducer,
        forgetPassword:forgetResetPasswordReducer,
        messages:resetMessagesReducer,
        timeline:timelineReducer,
        skill:skillReducer,
        Applicaton: softwareApplicationsReducer,
        project:ProjectReducer
        
    }
})