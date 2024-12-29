import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../utils/data';
import { initialState, Question, User } from '../types';

const pollSlice = createSlice({
    name: 'poll',
    initialState,
    reducers: {
        receiveUsers(state, action: PayloadAction<{ [key: string]: User }>) {
            state.users = action.payload;
        },
        receiveQuestions(state, action: PayloadAction<{ [key: string]: Question }>) {
            state.questions = action.payload;
        },
        addQuestion(state, action: PayloadAction<{ optionOneText: string; optionTwoText: string; author: string }>) {
            const { optionOneText, optionTwoText, author } = action.payload;
            const id = generateUID();
            const timestamp = Date.now();
            const newQuestion: Question = {
                id,
                author,
                timestamp,
                optionOne: {
                    votes: [],
                    text: optionOneText,
                },
                optionTwo: {
                    votes: [],
                    text: optionTwoText,
                }
            };
            state.questions[id] = newQuestion;
            state.users[author].questions.push(id);
        },
        saveQuestionAnswer(state, action: PayloadAction<{ authedUser: string; qid: string; answer: 'optionOne' | 'optionTwo' }>) {
            const { authedUser, qid, answer } = action.payload;
            state.users[authedUser].answers[qid] = answer;
            state.questions[qid][answer].votes.push(authedUser);
        }
    }
});

function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const { receiveUsers, receiveQuestions, addQuestion, saveQuestionAnswer } = pollSlice.actions;
export default pollSlice.reducer;