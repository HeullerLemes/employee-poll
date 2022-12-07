import { AUTHENTICATE_USER } from "../actions/autheticateUser";

export default function authenticatedUser(state = {}, action) {
    switch (action.type) {
      case AUTHENTICATE_USER:
        return {
          ...state,
          ...action.user,
        };
      default:
        return state;
    }
  }