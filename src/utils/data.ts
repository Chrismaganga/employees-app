type User = {
  id: string;
  password: string;
  name: string;
  avatarURL: string;
  answers: { [key: string]: 'optionOne' | 'optionTwo' };
  questions: string[];
};

let users: { [key: string]: User } = {
    sarahedo: {
      id: 'sarahedo',
      password: 'password123',
      name: 'Sarah Edo',
      avatarURL: 'https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png',
      answers: {  // Ensure answers is always defined as an object
        "8xf0y6ziyjabvozdd253nd": 'optionOne',
        "6ni6ok3ym7mf1p33lnez": 'optionOne',
        "am8ehyc8byjqgar0jgpub9": 'optionTwo',
        "loxhs1bqm25b708cmbf3g": 'optionTwo'
      },
      questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    },
    tylermcginnis: {
      id: 'tylermcginnis',
      password: 'abc321',
      name: 'Tyler McGinnis',
      avatarURL: "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png",
      answers: {  // Ensure answers is always defined as an object
        "vthrdm985a262al8qx3do": 'optionOne',
        "xj352vofupe1dqz9emx13r": 'optionTwo',
      },
      questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
    },
    mtsamis: {
      id: 'mtsamis',
      password: 'xyz123',
      name: 'Mike Tsamis',
      avatarURL: "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png",
      answers: {  // Ensure answers is always defined as an object
        "xj352vofupe1dqz9emx13r": 'optionOne',
        "vthrdm985a262al8qx3do": 'optionTwo',
        "6ni6ok3ym7mf1p33lnez": 'optionOne'
      },
      questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
    },
      zoshikanlu: {
        id: 'zoshikanlu',
        password: 'pass246',
        name: 'Zenobia Oshikanlu',
        avatarURL: "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png",
        answers: {},  // Make sure 'answers' is initialized as an empty object
        questions: [],
      }
  };
  
  type Question = {
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
  };
  
  let questions: { [key: string]: Question } = {};
  
  
  
  export function _getUsers() {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...users }), 1000);
    });
  }
  export function _getQuestions() {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...questions }), 1000);
    });
  }
  
  function formatQuestion({ optionOneText, optionTwoText, author }: { optionOneText: string, optionTwoText: string, author: string }) {
    return {
      id: generateUID(),
      timestamp: Date.now(),
      author,
      optionOne: {
        votes: [], 
        text: optionOneText,
      },
      optionTwo: {
        votes: [],
        text: optionTwoText,
      }
    }
  }

  export function _saveQuestion(question: { optionOneText: string; optionTwoText: string; author: string }) {
    const authedUser = question.author;
    return new Promise((resolve, reject) => {
      if (!(authedUser in users)) {
        reject("Please provide optionOneText, optionTwoText, and author");
        return;
      }

      const formattedQuestion = formatQuestion(question);
      const userAnswers = users[authedUser].answers;

      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: users[authedUser].questions.concat([formattedQuestion.id])
        }
      };

      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      };

      resolve(formattedQuestion);
    });
  }

  export function _saveQuestionAnswer({
    authedUser,
    qid,
    answer
  }: {
    authedUser: string;
    qid: string;
    answer: 'optionOne' | 'optionTwo';
  }) {
    return new Promise((resolve, reject) => {
      if (!authedUser || !qid || !answer) {
        reject("Please provide authedUser, qid, and answer");
        return;
      }

      if (!(qid in questions)) {
        reject("Question not found");
        return;
      }

      if (!(authedUser in users)) {
        reject("User not found");
        return;
      }

      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      };

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      };

      resolve(true);
    });
  }
  function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
