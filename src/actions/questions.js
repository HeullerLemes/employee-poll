import { saveQuestion } from "../reducers/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const UPDATE_VOTES = "UPDATE_VOTES";
export const ADD_QUESTION = "ADD_QUESTION";


export function receiveQuestions(questions) {
    return {
      type: RECEIVE_QUESTIONS,
      questions,
    };
}

export function newVote({ authedUser, qid, answer }) {
  return {
    type: UPDATE_VOTES,
    authedUser,
    qid,
    answer
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion(info) {
  return (dispatch) => {
    saveQuestion(info).then((question) => {
      dispatch(addQuestion(question));
    }).catch((e) => {
      console.error("Error in handleToggleTweet: ", e);
    })
  }
}