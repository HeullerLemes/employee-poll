import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleAddQuestion } from "../actions/questions";
import { useEffect } from "react";


const NewQuestion = (props) => {
    const navigate = useNavigate();
    const {user, dispatch} = props;
    useEffect(() => {
        if(user === undefined) {
            navigate("/")
        }
      }, []);

    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");
  
    const handleChangeOptionOne = (e) => {
      const text = e.target.value;
  
      setOptionOne(text);
    };

    const handleChangeOptionTwo = (e) => {
        const text = e.target.value;
    
        setOptionTwo(text);
      };
  
    const handleSubmit = (e) => {
      e.preventDefault();

      dispatch(handleAddQuestion({
        author: user.id,
        optionOneText: optionOne,
        optionTwoText: optionTwo
    }));
  
      setOptionOne("");
      setOptionTwo("");
      navigate("/");

    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Option one"
                       value={optionOne}
                       onChange={handleChangeOptionOne}></input>
                <input  placeholder="Option two"
                        value={optionTwo}
                        onChange={handleChangeOptionTwo}></input>
                <button className="btn" type="submit" disabled={optionOne === "" || optionTwo === ""}>
                  Submit
                </button>
            </form>
        </div>
    )
}

const mapStateToProps = ({ authenticatedUser, users }) => {
    return {
        user: users[Object.keys(users).find((userId) => userId === authenticatedUser.id)],
    }
};

export default connect(mapStateToProps)(NewQuestion);