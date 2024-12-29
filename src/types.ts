
export interface User {
    users: { [key: string]: User };
    id: string;
    name: string;
    avatarURL: string;
    answers: { [key: string]: 'optionOne' | 'optionTwo' };
    questions: string[];
}
export interface Question {
id: string;
author: string;
timestamp: number;
optionOne: {
    votes: string[];
    text: string;
};
optionTwo: {
    votes: string[];
    text: string;
};
}
export const initialState = {
    users: {} as { [key: string]: User },
    questions: {} as { [key: string]: Question }
};

export type State = typeof initialState;