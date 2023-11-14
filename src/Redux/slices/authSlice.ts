import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { admin } from '../../utils/userDetails';
import { obfuscateToken } from '../../utils/encryptTokens';
import { AdminProps, AuthProps, LoginProps } from '../../interfaces/typings';
import { addUsers } from '../../utils/Database/indexDb';
import { toast } from 'react-toastify';

const base_url = process.env.REACT_APP_API;

const initialState: AuthProps = {
	admin: undefined,
	loginLoading: false,
	loginError: '',
	logoutLoading: false,
	logoutError: '',
};

export const loginService = createAsyncThunk<AdminProps, LoginProps>('loginService', async (data) => {
	console.log('called');
	console.log(base_url);
	await axios.get(`${base_url}`);
	await addUsers();
	return admin;
});

export const logoutService = createAsyncThunk('logoutService', async () => {
	await axios.get(`${base_url}`);
	localStorage.removeItem('admin');
	return null;
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAdmin: (state, action) => {
			state.admin = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginService.pending, (state, action) => {
			state.loginLoading = true;
		});
		builder.addCase(loginService.fulfilled, (state, action) => {
			console.log(action.payload);
			state.loginLoading = false;
			state.admin = action.payload;
			toast.success('Login Successful');
			localStorage.setItem('admin', obfuscateToken(true, JSON.stringify(action.payload)));

			window.location.href = '/users';
		});
		builder.addCase(loginService.rejected, (state, action) => {
			state.loginLoading = false;
			state.loginError = action.error.message || 'An error occured';
		});
		builder.addCase(logoutService.pending, (state, action) => {
			state.logoutLoading = true;
		});
		builder.addCase(logoutService.fulfilled, (state, action) => {
			state.logoutLoading = false;
			state.admin = undefined;
			localStorage.removeItem('admin');
			toast.success('Logout Successful');
			window.location.href = '/';
		});
		builder.addCase(logoutService.rejected, (state, action) => {
			state.logoutLoading = false;
			state.logoutError = action.error.message || 'An error occured';
		});
	},
});

export const { setAdmin } = authSlice.actions;
export default authSlice.reducer;

export type RootState = {
	auth: {
		admin: AdminProps | undefined;
		loginLoading: boolean;
		loginError: string;
		logoutLoading: boolean;
		logoutError: string;
	};
};
