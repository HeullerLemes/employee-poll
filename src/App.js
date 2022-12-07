import './App.css';
import Login from './components/login';
import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from './actions/shared';
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/home';
import QuestionDetails from './components/questionDetails'
import Leaderboard from './components/leaderboard';
import NewQuestion from './components/newQuestion';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { authenticateUser } from './actions/autheticateUser';
import NotFoundPage from './components/404';


const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const App = ({user, currentPath, dispatch}) => {
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  const loggout = () => {
    dispatch(authenticateUser(null));
    navigate("/")
  }

  return (
    <Fragment>
      {currentPath !== '/' ? 
        <div>
            <Link to={`/home`}>
              <p>Home</p>
            </Link>
            <Link to={`/leaderboard`}>
              <p>Leaderboard</p>
            </Link>
            <Link to={`/add`}>
              <p>New</p>
            </Link>
            <div>
              <p>{user?.name}</p>
              <button onClick={loggout}>Logout</button>
            </div>
        </div>
      : null
      }

      <Routes>
        <Route path="/" exact element={<Login></Login>}/>
        <Route path="/home" exact element={<Home></Home>}/>
        <Route path="/questions/:question_id" element={<QuestionDetails></QuestionDetails>}/>
        <Route path='/leaderboard' element={<Leaderboard></Leaderboard>}/>
        <Route path='/add' element={<NewQuestion></NewQuestion>}/>
        <Route path='/notfound' element={<NotFoundPage></NotFoundPage>}/>
      </Routes>
    </Fragment>
  );
};

const mapStateToProps = ({ authenticatedUser }, props) => {
  return {
    user: authenticatedUser,
    currentPath: props.router.location.pathname
  }
};

export default withRouter(connect(mapStateToProps)(App));
