import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Leaderboard = (props) => {
    const navigate = useNavigate();
    const { user, users } = props;
    useEffect(() => {
        if(user === undefined) {
            navigate("/")
        }
      }, [navigate, user]);
    const compareUser = (userA, userB) => 
         (userB.questions.length + 
                Object.keys(userB.answers).length) -
                (userA.questions.length + 
                Object.keys(userA.answers).length)
    
    const orderedUsers = users.sort(compareUser);
    return (
        <div>
            {
                orderedUsers.map((user) =>(
                    <div key={user.id}>
                        <p>Name: {user.name} Questions asked: {user.questions.length} Questions answered: {Object.keys(user.answers).length}</p>
                        <img alt="User's avatar" src={user.avatarURL}/>
                    </div>
                ))
            }
        </div>
    )
}

const mapStateToProps = ({ authenticatedUser, users }) => {
    return {
        user: users[Object.keys(users).find((userId) => userId === authenticatedUser.id)],
        users: Object.keys(users).map((userId) => users[userId])
    }
};

export default connect(mapStateToProps)(Leaderboard);