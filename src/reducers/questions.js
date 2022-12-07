import { ADD_QUESTION, RECEIVE_QUESTIONS } from "../actions/questions";
import { UPDATE_VOTES } from "../actions/questions";

export default function questions(state = {}, action) {
    switch (action.type) {
      case RECEIVE_QUESTIONS:
        return {
          ...state,
          ...action.questions,
        };
      case UPDATE_VOTES:
        return {
          ...state,
          [action.qid]: {
            ...state[action.qid],
            [action.answer]: {
              ...state[action.qid][action.answer],
              votes: state[action.qid][action.answer].votes.concat([action.authedUser])
            }
          }
        };
      case ADD_QUESTION:
        return {
          ...state,
          [action.question.id]: action.question
        }
      default:
        return state;
    }
  }