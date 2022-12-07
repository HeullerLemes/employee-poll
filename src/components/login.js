import User from './user';
import { connect } from "react-redux";

const Login = (props) => {
    return (
      <div>
        <h3 className="center">Login to your user</h3>
        <ul className="dashboard-list">
          {props.usersIds.map((id) => (
            <li key={id}>
              <User id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  const mapStateToProps = ({ users }) => ({
    usersIds:  Object.keys(users),
  });
  
  export default connect(mapStateToProps)(Login);