import React, { useState } from "react";
import useSortableData from "../../utils/useSortableData";
import portrait from "../../media/img/avatar.png";
import AboutPerson from "./AboutPerson";

const MiddleSide = props => {
  let currentTbl = props.currentTbl ?? "Все организации";

  const [info, setInfo] = useState();

  const { items, requestSort, sortConfig } = useSortableData(
    props.searchData.length ? props.searchData : props.data
  );

  const searchHandler = value => {
    const result = props.data.filter(el =>
      el.first_name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      el.middle_name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      el.last_name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      el.email.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      el.position.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      el.work_phone.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    props.setSearchValue(value);
    props.setSearchData(result);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="row d-flex align-itemscenter">
          <div className="col-8">
            <h5>{ currentTbl }</h5>
          </div>
          <div className="col-4 d-flex justify-content-end">
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Поиск"
                aria-label="Search"
                value={props.searchValue}
                onChange={e => searchHandler(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="table-wrapper-scroll table-scroll table-responsive-md">
          <table
            className="table table-hover table-borderless table-sm"
            id="ATable"
          >
            <thead className="sticky">
              <tr>
                <th scope="col">
                  Фамилия
                  <button onClick={() => requestSort("last_name")}>
                    <i className={ sortConfig?.key === "last_name" ? sortConfig.direction : "bi bi-chevron-expand" } />
                  </button>
                </th>
                <th scope="col">
                  Имя
                  <button onClick={() => requestSort("first_name")}>
                    <i className={ sortConfig?.key === "first_name" ? sortConfig.direction : "bi bi-chevron-expand" } />
                  </button>
                </th>
                <th scope="col">
                  Отчество
                  <button onClick={() => requestSort("middle_name")}>
                    <i className={ sortConfig?.key === "middle_name" ? sortConfig.direction : "bi bi-chevron-expand" } />
                  </button>
                </th>
                <th scope="col">Компания</th>
                <th scope="col">Должность</th>
                <th scope="col">Рабочий телефон</th>
                <th scope="col">
                  E-mail
                  <button onClick={() => requestSort("email")}>
                    <i className={ sortConfig?.key === "email" ? sortConfig.direction : "bi bi-chevron-expand" } />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              { items && items.map(data => {
                return (
                  <tr
                    key={data.id}
                    data-toggle="modal"
                    data-target={"#aboutModal" + data.id}
                    onClick={() => {
                      props.width <= 1600 ? setInfo(data) : props.activeItem(data);
                    }}
                  >
                    <td>
                      <span className="text-decoration">
                        <img
                          src={
                            data.img !== "" && data.img !== null
                            ? process.env.REACT_APP_URL + "/image/" + data.uid + "/" + data.img
                            : portrait
                          }
                          alt={data.img !=="" ? data.img : portrait}
                        />
                        {data.last_name}
                      </span>
                    </td>
                    <td>{ data.first_name }</td>
                    <td>{ data.middle_name }</td>
                    {data.company !== null ? (
                      <td>{ data.company.name }</td>
                    ) : (
                      <td>...</td>
                    )}
                    <td>{ data.position }</td>
                    <td className="text-center">{ data.work_phone }</td>
                    <td>
                      <a className="emailto" href={"mailto" + data.email}>
                        { data.email }
                      </a>
                    </td>
                  </tr>
                );
              }) }
            </tbody>
          </table>
        </div>
      </div>
      {props.width <= 1600 ? <AboutPerson {...info} /> : ""}
      <div className="card-footer">
        <div className="row">
          <div className="col">
            <div className="records">Всего { items.length } записей</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleSide;