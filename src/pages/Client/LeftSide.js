import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { retrieveAddressBook } from "../../store/action-creators/addressBookActionCreator";
import { useDispatch } from "react-redux";

const LeftSide = props => {
  const dispatch = useDispatch();

  const handleClick = useCallback((val1, val2, val3, val4) => {
    props.activeMenu(val4);
    props.setSearchData([]);
    props.setSearchData("");
    dispatch(retrieveAddressBook(val1, val2, val3));
  }, [props, dispatch]);

  return (
    <div className="sidenav">
      <div className="card">
        <div className="card-body">
          <nav className="MainMenu">
            <div className="accordion" id="SideMenu">
              <div className="side-item">
                <button
                  className="btn btn-custom text-left prnt"
                  type="button"
                  onClick={() => handleClick(null, "all", null, "Все организации")}
                >
                  Организации
                </button>
              </div>
              {props.company && props.company.map((company, index) => {
                return (
                  <div className="side-item" key={index}>
                    <button
                      className="btn btn-custom text-left prnt"
                      type="button"
                      data-toggle="collapse"
                      data-target={"#collapseOne" + company.id}
                      aria-expanded="true"
                      aria-controls={"collapseOne" + company.id}
                      onClick={() => handleClick(company.id, "com", null, company.name)}
                    >
                      { company.name }
                    </button>
                    {company.cstr.map((cstr, indx) => {
                      return (
                        <div
                          key={indx}
                          id={"collapseOne" + company.id}
                          className="collapse"
                          data-parent="#SideMenu"
                        >
                          <button
                            className="btn btn-custom chld text-left"
                            type="button"
                            onClick={() => handleClick(cstr.id, "cstr", company.id, company.name + " / " + cstr.str_name)}
                          >
                            { cstr.str_name }
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

LeftSide.propTypes = {
  props: PropTypes.object,
};

export default LeftSide;