import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage/session'; // Use session storage
import profileReducer from '../features/profileSlice'
import examReducer from '../features/examSlice'
import studentReducer from '../features/studentIdSlice'
import paymentReducer from '../features/paymentSlice'
import roleReducer from '../features/roleSlice'
import studentNameReducer from '../features/studentNameSlice'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import teachersReducer from '../features/teacherSlice'
import studentsReducer from '../features/studentSlice'
import orgReducer from '../features/orgSlice'
import classReducer from '../features/classSlice'

const rootReducer = combineReducers({
    profile: profileReducer,
    exam: examReducer,
    student: studentReducer,
    payment: paymentReducer,
    role: roleReducer,
    studentName: studentNameReducer,
    teachers: teachersReducer,
    students: studentsReducer,
    org: orgReducer ,
    class: classReducer 

});

const persistConfig = {
    key: 'root',
    storage, // Use session storage for persisting
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these redux-persist action types
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);


export default store