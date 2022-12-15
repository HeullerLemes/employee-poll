import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleVote } from "../actions/users";
import { useEffect } from "react";
import { useState } from "react";
import { authenticateUser } from "../actions/autheticateUser";

const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return <Component {...props} router={{ location, navigate, params }} />;
    };

    return ComponentWithRouterProp;
};

const howManyPeopleWhoVotedOption = (option, users, question) => {
    let usersThatVoteForOptionCount = 0;
    let usersThatVotedCount = 0;
    let percentage = 0;
    for(let user of users) {
        if(user.answers[question.id]) {
            usersThatVotedCount++;
            if(user.answers[question.id] === option) {
                usersThatVoteForOptionCount++;
            }
        }
    }
    percentage = Math.floor((usersThatVoteForOptionCount * 100) / usersThatVotedCount);
    return {
        usersThatVoteForOptionCount,
        percentage
    };
}

const QuestionDetails = (props) => {
    const navigate = useNavigate();
    const [answer, setAnswer] = useState("teste");
    const [isQuestionAnswered, setIsQuestionAnswered] = useState("");
    const [selectedOption, setselectedOption] = useState("");
    const { user, question, users, dispatch } = props;

    useEffect(() => {
        if(user === undefined && !localStorage.getItem('user')) {
            navigate("/")
        } else if(question === undefined) {
            navigate("/notfound");
        } else {
            setAnswer(Object.keys(user.answers).find((answer) => answer === question.id));
            setIsQuestionAnswered(answer ? true : false);
            setselectedOption(user.answers[answer]);
        }
      }, [user, question, answer, navigate, setAnswer, setIsQuestionAnswered, setselectedOption ]);

    const peopleHowVotedOptionOne = howManyPeopleWhoVotedOption('optionOne', users, question);
    const peopleHowVotedOptionTwo = howManyPeopleWhoVotedOption('optionTwo', users, question);
    const selectOption = (selectedOption) => {
        dispatch(handleVote(
                {
                    authedUser: user, 
                    qid: question.id, 
                    answer: selectedOption
                }
            ));
            dispatch(authenticateUser(users[user.id]))
    };
    const avatarURL = users.find((user) => user.id === question.author)?.avatarURL;
    return (
    <div>
        <h1>Would You Rather</h1>
        {
            isQuestionAnswered  ?
            <div>
                <div>
                    <p style={{color: selectedOption === 'optionOne' ? 'green':''}}>{question?.optionOne?.text} {selectedOption === 'optionOne' ? '- Selected Option': ''}</p>
                    <p>Peoples who answer: {peopleHowVotedOptionOne?.usersThatVoteForOptionCount}</p> 
                    <p>Pergentage: {peopleHowVotedOptionOne?.percentage}</p>
                </div>
                <div>
                    <p>{question?.optionTwo?.text} {selectedOption === 'optionTwo' ? '- Selected Option': ''}</p>
                    <p>Peoples who answer: {peopleHowVotedOptionTwo?.usersThatVoteForOptionCount}</p>
                    <p>Pergentage: {peopleHowVotedOptionTwo?.percentage}</p>
                </div>
            </div>
            : 
            <div>
                <img alt="User's avatar" src={avatarURL}></img>
                <button onClick={() => selectOption('optionOne')}>{question?.optionOne?.text}</button>
                <button onClick={() => selectOption('optionTwo')}>{question?.optionTwo?.text}</button>
            </div>
        }
    </div>)
}

const mapStateToProps = ({ authenticatedUser, users, questions }, props ) => {
    return {
        user: users[Object.keys(users).find((userId) => userId === authenticatedUser.id)],
        question: questions[props.router.params.question_id],
        users: Object.keys(users).map((userId) => users[userId])
    }
};

export default withRouter(connect(mapStateToProps)(QuestionDetails));