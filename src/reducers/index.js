import { combineReducers } from "redux";
import users from './users';
import authenticatedUser from "./authenticateUser";
import questions from "./questions";

export default combineReducers({
    users,
    questions,
    authenticatedUser
});