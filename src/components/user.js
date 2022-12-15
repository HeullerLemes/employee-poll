import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../actions/autheticateUser";

const User = (props) => {
    const navigate = useNavigate();
    const { dispatch, user } = props;
    const navigateToHome = () => {
      dispatch(authenticateUser(user));
      localStorage.setItem('user', JSON.stringify(user));
      navigate("/home");
    }
    return (
      <button data-testid="selectUserButton" onClick={navigateToHome}>{user?.name}</button>
    )
}

const mapStateToProps = ({ users }, { id }) => {
    const user = users[id];
  
    return {
      user: user
        ? user
        : null,
    };
  };
export default connect(mapStateToProps)(User);