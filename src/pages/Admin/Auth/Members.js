import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, removeById } from "../../../store/action-creators/userActionCreator";
import Register from "./Register";
import UpdateMembers from "./UpdateMembers"
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Members = () => {
  const dispath = useDispatch();

  useEffect(() => {
    dispath(getAll());
  }, [dispath]);

  const user = useSelector(state => state.userReducer.user);

  const { user: currentUser } = useSelector(state => state.authReducer);

  if(!currentUser) {
    return <Redirect to="/login" />;
  }

  const remById = id => {
    dispath(removeById(id))
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
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col">
            <h5>Members</h5>
          </div>
          <div className="col d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary mr-1"
              data-toggle="modal"
              data-targer="#RegisterModal"
            >
              Добавить
            </button>
            <Register />
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table table-hover table-borderless">
          <thead className="thead-light">
            <tr>
              <th scope="col">№</th>
              <th scope="col">Никнейм</th>
              <th scope="col">E-mail</th>
              <th scope="col">Компания</th>
              <th scope="col">Роль</th>
              <th scope="col">Действие</th>
            </tr>
          </thead>
          <tbody>
            { user && user.map((user, index) => {
              return (
                <tr key={ index }>
                  <th scope="row">{ index }</th>
                  <td>{ user.username }</td>
                  <td>{ user.email }</td>
                  <td>{ user.company.name }</td>
                  <td>{ user.roles && user.roles.map((role, idx) => {
                    return <td key={ idx }>{ role.name }</td>
                  }) }</td>
                  <td className="container-fluid d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-warning mr-1"
                      data-toggle="modal"
                      data-targer="#exampleModal"
                    >
                      <i className="bi bi-pencil" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={ () => remById(user.id) }
                    >
                      <i className="bi bi-trash" />
                    </button>
                  </td>
                </tr>
              );
            }) }
          </tbody>
        </table>
        <UpdateMembers />
      </div>
      <div className="card-footer"></div>
      <ToastContainer position="bottom-right" autoClose={ 2000 } />
    </div>
  );
};

export default Members;
