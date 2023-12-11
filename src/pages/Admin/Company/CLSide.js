import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { create, removeAll, update } from "../../../store/action-creators/companyActionCreator";
import ShortUniqueId from "short-unique-id";
import { ToastContainer, toast } from "react-toastify";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { reorder } from "../../../utils/helpers";

export const CLSide = props => {
  const [comname, setComname] = useState("");
  // const [state, setState] = useState("");
  const dispatch = props.dispatch;

  const removeAllCompany = useCallback(() => {
    dispatch(removeAll())
      .then(message => {
        toast.success(message, {
          theme: "colored",
        });
        setComname("");
      })
        .catch(e => {
          toast.error(e, {
            theme: "colored",
          });
        });
  }, [dispatch]);

  const createCompany = () => {
    if(comname !== "") {
      const uid = new ShortUniqueId({ length: 10, dictionary: "alphanum" });

      dispatch(create(comname, props.company.length + 1, uid()))
        .then(message => {
          toast.success(message, {
            theme: "colored",
          });
          setComname("");
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
  };

  const onDragEnd = result => {
    if(!result.destination) {
      return
    }

    if(result.type === "droppableItem") {
      const items = reorder(
        props.company,
        result.source.index,
        result.destination.index,
      );

      for(let i = 0; i < items.length; i++) {
        if(items.indexOf === result.destination.index) {
          items[result.destination.index].company_sort_id = result.destination.index;
        }
        else {
          items[i].company_sort_id = i;
        }
      }

      dispatch(update(0, items));
    }
  };

  return (
    <>
      <div className="row mr-3 ml-3 mb-3">
        { props.user.roles[0] === "ADMIN" &&
          props.user.company.name === "ForusData" ?
        (
          <div className="d-flex w-100 mt-3">
            <div className="input-group mr-1">
              <input
                type="text"
                className="form-control"
                placeholder="Наименование организации"
                aria-describedby="button-add"
                value={comname}
                onChange={e => setComname(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  id="button-add"
                  onClick={() => createCompany()}
                >
                  Добавить
                </button>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeAllCompany()}
            >
              <i className="bi bi-trash" />
            </button>
          </div>
        ) : null }
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" type="droppableItem">
          {(provided, snapshot) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="list-group"
            >
              {props.company && props.company.map((company, companyIndex) => {
                return (
                  <Draggable
                    key={company.short_unique_id}
                    draggableId={company.id.toString()}
                    index={companyIndex}
                  >
                    {(provided, snapshot) => (
                      <li
                        className={props.comCurrent === company.id ? "list-group-item active" : "list-group-item"}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {props.user.roles[0] === "ADMIN" && props.company.name === "Forus Data" ? (
                          <button
                            className="btn btn-block text-left d-flex justify-content-between align-items-center"
                            type="button"
                            onClick={() => {
                              props.setCstrState(company.cstr);
                              props.setComState(company.id);
                            }}
                          >
                            {company.name}
                            <span className="badge badge-secondary badge-pill">{ company.cstr.length }</span>
                          </button>
                        ) : (
                          <button
                            className="btn btn-block text-left d-flex justify-content-between align-items-center"
                            disabled={props.user.company.name === company.name ? false : true}
                            type="button"
                          >
                            {company.name}
                            <span className="badge badge-secondary badge-pill">{ company.cstr.length }</span>
                          </button>
                        )}
                      </li>
                    )}
                  </Draggable>
                );
              })}
              { provided.placeholder }
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <ToastContainer position="bottom-right" autoClose={ 2000 } />
    </>
  );
};

CLSide.propTypes = {
  props: PropTypes.object,
};