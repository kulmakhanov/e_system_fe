import React, { useCallback } from "react";
import PropTypes from "prop-types";
import ShortUniqueId from "short-unique-id";
import { appendStrComById, removeAllStrCom, removeStrComp, update } from "../../../store/action-creators/companyActionCreator";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { reorder } from "../../../utils/helpers";

export const CRSide = props => {
  const dispatch = props.dispatch;

  const appendAllStr = useCallback(id => {
    var str_id = [];
    props.companyStr.forEach(n => str_id.push(n.id));
    const uid = new ShortUniqueId({ length: 10, dictionary: "alphanum" });

    let i = 0;
    while(i <= str_id.length) {
      dispatch(appendStrComById(id, str_id[i], uid()))
        .then(data => {
          toast.success(data.message, {
            theme: "colored",
          });
          props.setCstrState(
            data.data.find(x => x.id === props.comCurrent).cstr
          );
        })
          .catch(e => {
            toast.error(e, {
              theme: "colored",
            });
          });
      i++;
    }
  }, [props, dispatch]);

  const removeAllSrtructure = useCallback(id => {
    dispatch(removeAllStrCom(id))
      .then(data => {
        toast.success(data.message, {
          theme: "colored",
        });
        props.setCstrState(
          data.data.find(x => x.id === props.comCurrent).cstr
        );
      })
        .catch(e => {
          toast.error(e, {
            theme: "colored",
          });
        });
  }, [dispatch, props]);

  const removeById = useCallback((id_com, id_str) => {
    dispatch(removeStrComp(id_com, id_str))
      .then(data => {
        toast.success(data.message, {
          theme: "colored",
        });
        props.setCstrState(
          data.data.find(x => x.id === props.comCurrent).cstr
        );
      })
        .catch(e => {
          toast.error(e, {
            theme: "colored",
          });
        });
  }, [dispatch, props]);

  const appendStrCom = useCallback((id_com, id_str) => {
    const uid = new ShortUniqueId({ length: 10, dictionary: "alphanum" });
    dispatch(appendStrComById(id_com, id_str, uid()))
      .then(data => {
        toast.success(data.message, {
          theme: "colored",
        });
        props.setCstrState(
          data.data.find(x => x.id === props.comCurrent).cstr
        );
      })
        .catch(e => {
          toast.error(e, {
            theme: "colored",
          });
        });
  }, [dispatch, props]);

  const onDragEnd = result => {
    if(!result.destination) {
      return;
    }
    if(result.type.includes("droppableSubItem")) {
      const items = reorder(
        props.cstrState,
        result.source.index,
        result.destination.index,
      );

      for(let i = 0; i < items.length; i++) {
        if(items.indexOf === result.destination.index) {
          items[result.destination.index].structure_sort_id = result.destination.index;
        }
        else {
          items[i].structure_sort_id = i;
        }
      }

      dispatch(update(props.comCurrent, items))
        .then(data => {
          console.log(data);
          props.setCstrState(data.find(x => x.id === props.comCurrent).cstr);
        })
          .catch(e => {
            toast.error(e, {
              theme: "colored",
            });
          });
    }
  };

  return (
    <div className="row flex-column mr-3 ml-3">
      <div className="card-body">
        <div className="row-custom mb-1 justify-content-end">
          <div className="mb-3">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => appendAllStr(props.comCurrent)}
              >
                Добавить
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
                {props.companyStr && props.companyStr.map((comStr, index) => {
                  return (
                    <option
                      className="dropdown-item"
                      onClick={() => appendStrCom(props.comCurrent, comStr.id)}
                      key={index}
                    >
                      {comStr.str_name}
                    </option>
                  );
                })}
              </div>
            </div>
            {props.user.roles[0] === "ADMIN" && props.user.company.name === "Forus Data" ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeAllSrtructure(props.comCurrent)}
              >
                <i className="bi bi-trach" />
                <span>Удалить все</span>
              </button>
            ) : null}
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" type="droppableSubItem">
            {(provided, snapshot) => (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="list-group"
              >
                {props.cstrState && props.cstrState.map((str, strIndex) => {
                  return (
                    <Draggable
                      key={str.structure_unique_id}
                      draggableId={str.id.toString()}
                      index={strIndex}
                    >
                      {(provided, snapshot) => (
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <span>{ str.str_name }</span>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => removeById(props.comCurrent, str.id)}
                          >
                            <i className="bi bi-trash" />
                          </button>
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
      </div>
    </div>
  );
};

CRSide.propTypes = {
  props: PropTypes.object,
};