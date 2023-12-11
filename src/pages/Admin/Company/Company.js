import React, { useEffect, useState } from "react";
import { retrieveStr } from "../../../store/action-creators/companyStrActionCreator";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Structure } from "./Structure";
import { CLSide } from "./CLSide";
import { CRSide } from "./CRSide";

const Company = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveStr());
  }, [dispatch]);

  const companyStr = useSelector(state => state.companyStrReducer);
  const company = useSelector(state => state.companyReducer);

  const [cstrState, setCstrState] = useState(
    company.find(x => x.id === props.user.company.id).cstr
  );
  const [comCurrent, setComState] = useState(props.user.company.id);

  if(!props.user) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="row-custom">
          <h5>Компании</h5>
        </div>
      </div>
      <div className="card-body">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="company-tab"
              data-toggle="tab"
              data-target="#company"
              type="button"
              role="tab"
              aria-controls="company"
              aria-selected="true"
            >
              Компании
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="structure-tab"
              data-toggle="tab"
              data-target="#structure"
              type="button"
              role="tab"
              aria-controls="structure"
              aria-selected="false"
            >
              Структура
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="company"
            role="tabpanel"
            aria-labelledby="company-tab"
          >
            <div className="row">
              <div className="column-custom p-1 col-r">
                <CLSide
                  company={company}
                  companyStr={companyStr}
                  dispatch={dispatch}
                  user={props.user}
                  setCstrState={setCstrState}
                  setComState={setComState}
                  comCurrent={comCurrent}
                />
              </div>
              <div className="column-custom p-1">
                <CRSide
                  dispatch={dispatch}
                  companyStr={companyStr}
                  comCurrent={comCurrent}
                  setCstrState={setCstrState}
                  cstrState={cstrState}
                  user={props.user}
                />
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="structure"
            role="tabpanel"
            aria-labelledby="structure-tab"
          >
            <Structure
              companyStr={companyStr}
              dispatch={dispatch}
              user={props.user}
            />
          </div>
        </div>
      </div>
      <div className="card-footer"></div>
    </div>
  );
};

export default Company;