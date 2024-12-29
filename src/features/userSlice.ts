import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../utils/data';

type User = {
    id: string;
    password: string;
    name: string;
    avatarURL: string;
    answers: { [key: string]: 'optionOne' | 'optionTwo' };
    questions: string[];
};

type UsersState = {
    users: { [key: string]: User };
    loading: boolean;
    error: string | null;
};

const initialState: UsersState = {
    users: {},
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsersStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess(state, action: PayloadAction<{ [key: string]: User }>) {
            state.users = action.payload;
            state.loading = false;
        },
        fetchUsersFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        saveQuestionSuccess(state, action: PayloadAction<User>) {
            state.users[action.payload.id] = action.payload;
        },
        saveQuestionAnswerSuccess(state, action: PayloadAction<User>) {
            state.users[action.payload.id] = action.payload;
        },
    },
});

export const {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    saveQuestionSuccess,
    saveQuestionAnswerSuccess,
} = userSlice.actions;

export const fetchUsers = () => async (dispatch: any) => {
    dispatch(fetchUsersStart());
    try {
        const users = await _getUsers();
        dispatch(fetchUsersSuccess(users as { [key: string]: User }));
    } catch (error: any) {
        dispatch(fetchUsersFailure(error.toString()));
    }
};

export const saveQuestion = (question: { optionOneText: string; optionTwoText: string; author: string }) => async (dispatch: any) => {
    try {
        const formattedQuestion = await _saveQuestion(question);
        dispatch(saveQuestionSuccess(formattedQuestion as User));
    } catch (error) {
        console.error(error);
    }
};

export const saveQuestionAnswer = (answerInfo: { authedUser: string; qid: string; answer: 'optionOne' | 'optionTwo' }) => async (dispatch: any) => {
    try {
        const updatedUser = await _saveQuestionAnswer(answerInfo);
        dispatch(saveQuestionAnswerSuccess(updatedUser as User));
    } catch (error) {
        console.error(error);
    }
};

export default userSlice.reducer;