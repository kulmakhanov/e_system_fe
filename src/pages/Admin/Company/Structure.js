import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { removeAllStr, removeStrById } from "../../../store/action-creators/companyStrActionCreator";
import { ToastContainer, toast } from "react-toastify";
import { create, update } from "../../../store/action-creators/companyActionCreator";

export const Structure = props => {
  const [name, setName] = useState("");
  const [current, setCurrent] = useState({
    id: 0,
    value: "",
  });

  const dispatch = props.dispatch;

  const removeSById = useCallback(id => {
    dispatch(removeStrById(id))
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
  },[dispatch]);

  const createStr = useCallback(() => {
    if(name !== "") {
      dispatch(create(name))
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
    }
    else {
      alert("Пустое поле");
    }
  }, [dispatch, name]);

  const removeAll = useCallback(() => {
    dispatch(removeAllStr())
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

  const checkDisableInput = (id, value) => {
    if(current.id === 0) {
      setCurrent({ id, value });
    }
    else if(current.id === id) {
      setCurrent({ id: 0, value: "" });
    }
    else if(current.id > 0) {
      setCurrent({ id, value });
    }
    else {
      setCurrent({ id: 0, value: "" });
    }
  };

  const setValue = (id, value) => {
    if(current.id !== 0) {
      if(current.id === id) {
        return current.value;
      }
      return value;
    }
    return value;
  };

  const updateStrById = () => {
    dispatch(update(current.id, current.value))
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
    <>
      <div className="row flex-column mr-3 ml-3">
        <div className="d-flex w-100">
          <div className="input-group mr-1">
            <input
              type="text"
              className="form-control"
              placeholder="Наименование организации"
              aria-describedby="button-add"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={createStr}
              >
                Добавить
              </button>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={removeAll}
            disabled={props.user.roles[0] === "ADMIN" ? false : true}
          >
            <i className="bi bi-trash" />
          </button>
        </div>
      </div>
      <hr />
      <div className="row-custom flex-column mr-3 ml-3">
        <div className="d-flex w-100">
          <button
            type="button"
            className="btn btn-success w-100"
            disabled={current.id === 0 ? true : false}
            onClick={() => updateStrById()}
          >
            Сохранить изменения
          </button>
        </div>
      </div>
      <ul className="list-group mt-3">
        {props.companyStr.map(row => {
          return (
            <li
              className="list-group-item d-flex justify-content-between"
              key={row.id}
            >
              <div className="input-group">
                <span className="badge badge-secondary align-self-center mr-3">
                  {row.id}
                </span>
                <input
                  id={row.id}
                  type="text"
                  className="form-control"
                  value={setValue(row.id, row.str_name)}
                  onChange={e => setCurrent({...current, value: e.target.value})}
                  disabled={current.id === row.id ? false : true}
                />
                <div className="input-group-append" id="button-addon4">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => checkDisableInput(row.id, row.str_name)}
                  >
                    <i className="bi bi-pencil" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeSById(row.id)}
                    disabled={props.user.roles[0] === "ADMIN" ? false : true}
                  >
                    <i className="bi bi-trash" />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <ToastContainer position="bottom-right" autoClose={ 2000 } />
    </>
  );
};

Structure.propTypes = {};