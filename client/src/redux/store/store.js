import{configureStore} from '@reduxjs/toolkit'
import loaderReducer from '../slice-state/loaderSlice'
import profileReducer from '../slice-state/profileSlice'
import summaryReducer from '../slice-state/summarySlice'
import taskReducer from '../slice-state/taskSlice'

export default configureStore({
    reducer:{
        progress:loaderReducer,
        task:taskReducer,
        summary:summaryReducer,
        profile:profileReducer
    }
})