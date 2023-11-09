// src/state/counterSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../interfaces/typings';

const initialState: AppState = {
	counter: 0,
	user: null,
};

export const fetchLoans = createAsyncThunk('fetchLoans', async () => {
	const res = await fetch(`https://run.mocky.io/v3/39ea9fd0-3025-4287-a056-078c5df0f118`);
	console.log(res);
	return res;
});

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => {
			state.counter += 1;
		},
		decrement: (state) => {
			state.counter -= 1;
		},
		setCounter: (state, action: PayloadAction<number>) => {
			state.counter = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchLoans.fulfilled, (state, action) => {
			// state.user = action.payload;
		});
	},
});

export const { increment, decrement, setCounter } = counterSlice.actions;
export default counterSlice.reducer;
