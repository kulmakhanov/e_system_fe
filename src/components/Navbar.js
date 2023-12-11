import React, { useCallback } from "react";
import AddPerson from "../pages/Admin/Main/AddPerson";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/action-creators/authActionCreator";
import logo from "../media/img/logo.png";
import Import from "./Import";
import ReactExport from "react-data-export";
import DarkMode from "./DarkMode";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const Navbar = props => {
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const { pathname } = useLocation();

  const data = useSelector(state => state.addressBookReducer);

  const multiDataSet = [
    {
      columns: [
        {
          title: "Имя",
          width: { wch: 20 },
          style: { font: { bold: true } },
        },
        {
          title: "Фамилия",
          width: { wch: 20 },
          style: { font: { bold: true } },
        },
        {
          title: "Отчество",
          width: { wch: 20 },
          style: { font: { bold: true } },
        },
        {
          title: "Дата рождения",
          width: { wch: 20 },
          style: { font: { bold: true } },
        },
        {
          title: "Мобильный",
          width: { wch: 20 },
          style: { font: { bold: true } },
        },
        {
          title: "Рабочий",
          width: { wch: 20 },
          style: { font: { bold: true } },
        },
        {
          title: "E-mail",
          width: { wch: 20 },
          style: { font: { bold: true } },
        },
        {
          title: "Компания",
          width: { wch: 20 },
          style: { font: { bold: true } },
        },
        {
          title: "Структура",
          width: { wch: 20 },
          style: { font: { bold: true } },
        },
        {
          title: "Должность",
          width: { wch: 20 },
          style: { font: { bold: true } },
        }   
      ],
      data: data.map(data => [
        { value: data.first_name ?? "" },
        { value: data.last_name ?? "" },
        { value: data.middle_name ?? "" },
        { value: data.bday ?? "" },
        { value: data.mobile_phone ?? "" },
        { value: data.work_phone ?? "" },
        { value: data.email ?? "" },
        { value: data.company?.name },
        { value: data.company_structure?.str_name },
        { value: data.position },

      ]),
    },
  ];

  if(pathname === "/login") {
    return false;
  }
  else {
    return (
      <>
        <nav className="navbat navbar-expand-lg navbar-dark-shadow">
          <div className="navbar-wrapper">
            <a href="/" className="logo">
              <img src={ logo } alt="ForusData" />
            </a>
            <div className="navbar-nav mr-auto"></div>
            <div className="navbar-nav">
              <DarkMode />
              { props.currentUser ? (
                <>
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#addmodal"
                    className="btn btn-warning rounded-circle d-flex align-items-center ml-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-plus-lg"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                      />
                    </svg>
                  </button>
                  <AddPerson />
                </>
              ) : null }

              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="/address-book"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										fill='currentColor'
										className='bi bi-three-dots-vertical'
										viewBox='0 0 16 16'
                  >
                    	<path d='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z' />
                  </svg>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  { !props.currentUser ? (
                    <>
                      <ExcelFile
                        filename="AddressBook"
                        element={
                          <button className="dropdown-item">Экспортировать в Excel</button>
                        }
                      >
                        <ExcelSheet
                          name="List_of_people"
                          dataSet={multiDataSet}
                        >
                        </ExcelSheet>
                      </ExcelFile>
                      <div className="dropdown-divider" />
                      <Link className="dropdown-item" to="/login">
                        Войти
                      </Link>
                    </>
                  ) : (
                    <>
                      <ExcelFile
                        filename="AddressBook"
                        element={
                          <button className="dropdown-item">Экспортировать в Excel</button>
                        }
                      >
                        <ExcelSheet
                          name="List_of_people"
                          dataSet={multiDataSet}
                        ></ExcelSheet>
                      </ExcelFile>
                      <button
                        type="button"
                        className="dropdown-item"
                        data-toggle="modal"
                        data-target="#importModal"
                      >
                        Импортировать в Excel
                      </button>
                      <Link className="dropdown-item" to="/company">
                        Компании/Орг. структура
                      </Link>
                      { props.currentUser.roles[0] === "ADMIN" &&
                        props.currentUser.company.name === "ForusData" ? (
                          <Link className="dropdown-item" to="/members">Пользователи</Link>
                        ) : null }
                        <div className="dropdown-divider" />
                        <Link className="dropdown-item" to="/" onClick={ logOut }>
                          Выйти
                        </Link>
                    </>
                  ) }
                </div>
              </li>
              <Import />
            </div>
          </div>
        </nav>
      </>
    );
  }
};

export default Navbar;