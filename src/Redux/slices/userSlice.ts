import { usersData } from '../../utils/userDetails';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../interfaces/typings';
import axios from 'axios';

const initialState: AppState = {
	counter: 0,
	users: [],
	filteredUsers: [],
	usersLoading: false,
	usersError: '',
	currentPage: 1,
	totalPages: 0,
	pageSize: 9,
};

export const fetchLoans = createAsyncThunk('fetchLoans', async () => {
	const res = await axios.get(`https://run.mocky.io/v3/39ea9fd0-3025-4287-a056-078c5df0f118`);
	console.log(res);
	return usersData;
});

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		buttonPagination: (state, action) => {
			const currentPage = action.payload;
			state.currentPage = currentPage;
			state.filteredUsers = state.users.slice((currentPage - 1) * state.pageSize, currentPage * state.pageSize);
		},
		setItemsPerPage: (state, action) => {
			state.pageSize = action.payload;
			state.totalPages = state.users.length / state.pageSize;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchLoans.fulfilled, (state, action) => {
			state.users = action.payload;
			state.filteredUsers = action.payload.slice(0, state.pageSize);
			state.usersLoading = false;
			state.usersError = '';
			state.totalPages = action.payload.length / state.pageSize;
		});
		builder.addCase(fetchLoans.rejected, (state, action) => {
			state.users = [];
			state.filteredUsers = [];
			state.usersLoading = false;
			state.usersError = 'An error occured';
		});
		builder.addCase(fetchLoans.pending, (state) => {
			state.usersLoading = true;
			state.users = [];
			state.filteredUsers = [];
			state.usersError = '';
		});
	},
});

export const { buttonPagination, setItemsPerPage } = counterSlice.actions;
export default counterSlice.reducer;
