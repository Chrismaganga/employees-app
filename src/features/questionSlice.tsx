import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../utils/data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
    id: string;
    optionOne: {
        votes: string[];
        text: string;
    };
    optionTwo: {
        votes: string[];
        text: string;
    };
}

const questions: { [key: string]: Question } = {};

const questionSlice = createSlice({
    name: 'questions',
    initialState: questions,
    reducers: {
        receiveQuestions(state, action: PayloadAction<{ [key: string]: Question }>) {
            return {
                ...state,
                ...action.payload
            };
        },
        addQuestion(state, action: PayloadAction<Question>) {
            const question = action.payload;
            return {
                ...state,
                [question.id]: question
            };
        },
        saveQuestionAnswer(state, action: PayloadAction<{ authedUser: string; qid: string; answer: 'optionOne' | 'optionTwo' }>) {
            const { authedUser, qid, answer } = action.payload;
            state[qid][answer].votes.push(authedUser);
        }
    }
});

export const { receiveQuestions, addQuestion, saveQuestionAnswer: saveQuestionAnswerAction } = questionSlice.actions;

export default questionSlice.reducer;

export const fetchQuestions = () => async (dispatch: any) => {
    const questions: { [key: string]: Question } = await _getQuestions() as { [key: string]: Question };
    dispatch(receiveQuestions(questions));
};

export const saveQuestion = (question: { optionOneText: string; optionTwoText: string; author: string }) => async (dispatch: any) => {
    const formattedQuestion = await _saveQuestion(question) as Question;
    dispatch(addQuestion(formattedQuestion));
};

export const saveQuestionAnswer = (info: { authedUser: string; qid: string; answer: 'optionOne' | 'optionTwo' }) => async (dispatch: any) => {
    await _saveQuestionAnswer(info);
    dispatch(saveQuestionAnswerAction(info));
};