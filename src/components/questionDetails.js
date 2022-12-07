import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleVote } from "../actions/users";
import { useEffect } from "react";
import { useState } from "react";

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
    let usersCount = 0;
    let percentage = 0;
    for(let user of users) {
        if(user.answers[question.id] && user.answers[question.id] === option) {
            usersCount++;
        }
    }
    percentage = (usersCount * 100) / users.length;
    return {
        usersCount,
        percentage
    };
}

const QuestionDetails = (props) => {
    const navigate = useNavigate();
    const [answer, setAnswer] = useState("teste");
    const [isQuestionAnswered, setIsQuestionAnswered] = useState("");
    const [selectedOption, setselectedOption] = useState("");
    const  { user, question, users, dispatch } = props;

    useEffect(() => {
        if(user === undefined) {
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
                    authedUser: user.id, 
                    qid: question.id, 
                    answer: selectedOption
                }
            ));
    };
    const avatarURL = users.find((user) => user.id === question.author).avatarURL;
    return (
    <div>
        <h1>Would You Rather</h1>
        {
            isQuestionAnswered  ?
            <div>
                <div>
                    <p>Peoples who answer: {peopleHowVotedOptionOne?.usersCount}</p> 
                    <p>Pergentage: {peopleHowVotedOptionOne?.percentage}</p>
                    <p>{selectedOption === 'optionOne' ? 'Ok': ''}</p>
                </div>
                <div>
                    <p>Peoples who answer: {peopleHowVotedOptionTwo?.usersCount}</p>
                    <p>Pergentage: {peopleHowVotedOptionTwo?.percentage}</p>
                    <p>{selectedOption === 'optionTwo' ? 'Ok': ''}</p>
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