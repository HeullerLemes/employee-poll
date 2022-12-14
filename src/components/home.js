import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = (props) => {
    let navigate = useNavigate();

    const [view, setView] =  useState("unanswered");
    const { user, answeredQuestions, unansweredQuestions, questions } = props;

    useEffect(() => {
        if(user === undefined) {
            navigate("/")
        }
      }, [navigate, user]);

      const updateSelectedView = () => {
        if(view === 'unanswered') {
            setView('answered');
        } else {
            setView('unanswered');
        }
      }
    const compareAnswer = (answerA, answerB) => {
        return questions[answerA].timestamp - questions[answerB].timestamp;
    }

    const getDate = (timestamp) => {
        return new Date(timestamp).toUTCString();
    }

    const orderedUnansweredQuestions = unansweredQuestions.sort(compareAnswer);
    const orderedAnsweredQuestions = answeredQuestions.sort(compareAnswer);

    return(
        <div>
            <button data-testid="changeViewButton" onClick={updateSelectedView}>Change view</button>
            {
                view === 'unanswered' ? 
                <div data-testid="unanswered">
                    <h1>Unanswered questions</h1>
                    {
                        orderedUnansweredQuestions.map((unansweredQuestion) => (
                            <div key={unansweredQuestion}>
                                <Link to={`/questions/${unansweredQuestion}`}>
                                    <p>{questions[unansweredQuestion].author} - {questions[unansweredQuestion].id} - {getDate(questions[unansweredQuestion].timestamp)}</p>
                                </Link>
                            </div>
                        ))
                    }
                </div>
                :
                <div data-testid="answered">
                    <h1>Answered questions</h1>
                    {
                        orderedAnsweredQuestions.sort(compareAnswer).map((answeredQuestion) => (
                            <div key={answeredQuestion}>
                                <Link to={`/questions/${answeredQuestion}`}>
                                    <p>{questions[answeredQuestion].author} - {questions[answeredQuestion].id} - {getDate(questions[answeredQuestion].timestamp)}</p>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
};

const mapStateToProps = ({ authenticatedUser, questions, users }) => {
    const user = users[Object.keys(users).find((userId) => userId === authenticatedUser.id)];
    const answeredQuestions = Object.keys(user.answers);
    const unansweredQuestions = Object.keys(questions).filter((question) => !answeredQuestions.find((answeredQuestion) => answeredQuestion === question));

    return {
        user,
        answeredQuestions,
        unansweredQuestions,
        questions
    }
};

export default connect(mapStateToProps)(Home)