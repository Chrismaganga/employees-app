import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getUsers } from '../utils/data';

interface User {
    id: string;
    password: string;
    name: string;
    avatarURL: string;
    answers: Record<string, string>;
    questions: string[];
}

interface AuthState {
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    status: 'idle',
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ id, password }: { id: string; password: string }, { rejectWithValue }) => {
        try {
            const users = await _getUsers() as Record<string, User>;
            const user = users[id];
            if (user && user.password === password) {
                return user;
            } else {
                return rejectWithValue('Invalid credentials');
            }
        } catch (error) {
            return rejectWithValue('Failed to login');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;