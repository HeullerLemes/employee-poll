import { saveQuestionAnswer } from "../reducers/api";
import { newVote } from "./questions";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function vote({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    authedUser: authedUser.id,
    qid,
    answer
  }
}

export function handleVote(info) {
  return (dispatch) => {
    dispatch(vote(info));
    dispatch(newVote(info));
    return saveQuestionAnswer(info).catch((e) => {
      console.error("Error in handleToggleTweet: ", e);
    })
  }
}

