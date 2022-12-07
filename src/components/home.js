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
                                    <p>{questions[unansweredQuestion].author} - {questions[unansweredQuestion].id}</p>
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
                                    <p>{questions[answeredQuestion].author} - {questions[answeredQuestion].id}</p>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
};

const mapStateToProps = ({ authenticatedUser, questions }) => {
    const answeredQuestions = Object.keys(authenticatedUser.answers);
    const unansweredQuestions = Object.keys(questions).filter((question) => !answeredQuestions.find((answeredQuestion) => answeredQuestion === question));

    return {
        user: authenticatedUser,
        answeredQuestions,
        unansweredQuestions,
        questions
    }
};

export default connect(mapStateToProps)(Home)