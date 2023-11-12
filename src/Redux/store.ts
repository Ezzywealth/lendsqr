import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
	reducer: {
		users: usersReducer,
		auth: authReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
