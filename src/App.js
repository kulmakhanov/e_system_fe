import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import { useDispatch, useSelector } from "react-redux";
import { history } from "./utils/history";
import { clearMessage } from "./store/action-creators/messageActionCreator";
import { useRoute } from "./routes/routes";
import { retrieveCompany } from "./store/action-creators/companyActionCreator";
import { retrieveStr } from "./store/action-creators/companyStrActionCreator";
import Navbar from "./components/Navbar";
import FullScreenLoader from "./components/elements/FullScreenLoader";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen(() => {
      dispatch(clearMessage());
    });
    dispatch(retrieveStr());
    dispatch(retrieveCompany()).then(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, [dispatch]);

  const router = useRoute(currentUser);
  if(loading) {
    return <FullScreenLoader />;
  }
  if(currentUser) {
    return(
      <Router history = { history }>
        { currentUser && (
          <>
            <Navbar currentUser = { currentUser } />
            <div className="container mt-2">{ router }</div>
          </>
        ) }
      </Router>
    );
  }
  else {
    return(
      <Router history = { history }>
        <>
          <Navbar />
          <div className="container-fluid mt-1">{ router }</div>
        </>
      </Router>
    );
  }
};

export default App;
