import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveAddressBook,
  removeAddressBookById,
  removeAddressBookAll
} from "../../../store/action-creators/addressBookActionCreator";
import UpdatePerson from "./UpdatePerson";
import portrait from "../../../media/img/avatar.png";
import useSortableData from "../../../utils/useSortableData";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddressBook = props => {
  const [loading, setLoading] = useState(false);
  const [currentTblName, setCurrentTblName] = useState("Все компании");
  const [currentData, setCurrentData] = useState(null);
  const [searchData, setSearchData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if(props.user.company === "Forus Data" && props.user.roles[0] === "ADMIN") {
      dispatch(retrieveAddressBook(null, "all", null));
    }
    else {
      dispatch(retrieveAddressBook(props.user.company.id, "com", null))
        .then(() => setCurrentTblName(props.user.company.name));
    }
  }, [dispatch, props.user.company, props.user.roles]);

  const data = useSelector(state => state.addressBookReducer);
  const company = useSelector(state => state.companyReducer);

  const { items, requestSort, sortConfig } = useSortableData(searchData.length ? searchData : data);

  const removeById = useCallback(id => {
    dispatch(removeAddressBookById(id))
      .then(message => {
        toast.success(message, {
          theme: "colored",
        });
      })
        .catch(e => {
          toast.error(e, {
            theme: "colored",
          });
        });
  }, [dispatch]);

  const setActiveItem = data => {
    setCurrentData(data);
  };

  const handleClick = useCallback((val1, val2, val3) => {
    setCurrentTblName(val3);

    dispatch(retrieveAddressBook(val1, val2))
      .then(message => {
        toast.success(message, {
          theme: "colored",
        });
      })
        .catch(e => {
          toast.error(e, {
            theme: "colored",
          });
        });
  }, [dispatch]);

  const removeAll = useCallback(() => {
    setLoading(true);
    dispatch(removeAddressBookAll())
      .then(message => {
        setTimeout(() => {
          setLoading(false);
        }, 200);
        toast.success(message, {
          theme: "colored",
        });
      })
        .catch(e => {
          setLoading(false);
          toast.error(e, {
            theme: "colored",
          });
        });
  }, [dispatch]);

  if(!props.user) {
    return <Redirect to="/login" />;
  }

  const searchHandler = value => {
    const result = data.filter(el =>
      el.first_name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      el.middle_name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      el.last_name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      el.email.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      el.position.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    setSearchData(result);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col">
            <h5>Список контактов / {currentTblName}</h5>
          </div>
          <div className="col d-flex justify-content-center">
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Поиск"
                aria-label="Search"
                onChange={e => searchHandler(e.target.value)}
              />
            </form>
          </div>
          <div className="col d-flex justify-content-end">
            {props.user.roles[0] === "ADMIN" && props.user.company.name === "Forus Data" ? (
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {handleClick(null, "all", "Все компании");}}
                  disabled={loading}
                >
                  <span>Все компании</span>
                </button>
                <button
                  type="button"
                  className="btn btn-primary dropdown-toggle dropdown-toggle-split mr-1"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu">
                  {company && company.map((company, index) => {
                    return (
                      <button
                        key={index}
                        type="button"
                        className="dropdown-item"
                        onClick={() => {handleClick(company.id, "com", company.name);}}
                      >
                        {company.name}
                      </button>
                    );
                  })}
                </div> 
              </div> 
            ) : null}
            {props.user.roles[0] === "ADMIN" && props.user.company.name === "Forus Data" ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeAll()}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Loading...</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-trash" />
                    <span>Удалить все</span>
                  </>
                )}
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="table-wrapper-scroll table-scroll table-sm">
          <table className="table table-hover table-borderless" id="ATable">
            <thead className="sticky">
              <tr>
                <th scope="col" onClick={() => requestSort("last_name")}>
                  Фамилия
                  <i className={sortConfig?.key === "last_name" ? sortConfig.direction : "bi bi-chevron-expand"} />
                </th>
                <th scope="col" onClick={() => requestSort("first_name")}>
                  Имя
                  <i className={sortConfig?.key === "first_name" ? sortConfig.direction : "bi bi-chevron-expand"} />
                </th>
                <th scope="col" onClick={() => requestSort("middle_name")}>
                  Отчество
                  <i className={sortConfig?.key === "middle_name" ? sortConfig.direction : "bi bi-chevron-expand"} />
                </th>
                <th scope="col" onClick={() => requestSort("company")}>
                  Компания
                  <i className={sortConfig?.key === "company" ? sortConfig.direction : "bi bi-chevron-expand"} />
                </th>
                <th scope="col">Должность</th>
                <th scope="col">Рабочий телефон</th>
                <th scope="col">E-mail</th>
                <th scope="col">Действие</th>
              </tr>
            </thead>
            <tbody>
              {items && items.map(data => {
                return (
                  <tr key={data.id} onClick={() => setActiveItem(data)}>
                    <td
                      data-toggle="modal"
                      data-target={"#UpdateModal" + data.id}
                    >
                      <span className="text-decoration">
                        <img
                          src={
                            data.img !== "" && data.img !== null
                              ? process.env.REACT_APP_URL + "/image/" + data.uid + "/" + data.img
                                : portrait
                          }
                          alt={data.img !== "" ? data.img : portrait}
                        />
                        {data.last_name}
                      </span>
                    </td>
                    <td>{data.first_name}</td>
                    <td>{data.middle_name}</td>
                    {data.company !== null ? (
                      <td>{data.company.name}</td>
                    ) : (
                      <td>...</td>
                    )}
                    <td>{data.position}</td>
                    <td className="text-center">{data.work_phone}</td>
                    <td>
                      <a className="emailto" href={"mailto:" + data.email}>
                        {data.email}
                      </a>
                    </td>
                    <td className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-warning mr-1"
                        data-toggle="modal"
                        data-target={"#UpdateModal" + data.id}
                      >
                        <i className="bi bi-pencil" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeById(data.id)}
                      >
                        <i className="bi bi-trash" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <UpdatePerson {...currentData} />
        <ToastContainer position="bottom-right" autoClose={2000} />
      </div>
      <div className="card-footer">
        <div className="row">
          <div className="col">
            <div className="records">Всего {data.length} записей</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressBook;