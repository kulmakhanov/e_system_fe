import React, { useState, useEffect } from "react";
import portrait from "../../media/img/avatar.png";
import PropTypes from "prop-types";

const RightSide = props => {
  const initialState = {
    first_name: "...",
    middle_name: "",
    last_name: "",
    company_id: "",
    company_str_id: "",
    position: "",
    address: "",
    mobile_phone: "",
    work_phone: "",
    fax: "",
    email: "",
    email2: "",
    img: undefined,
    homepage: "",
    bday: "",
    company: "",
    company_structure: "",
    previewImg: undefined,
    uid: "",
  };

  const [currentData, setCurrentData] = useState(initialState);

  useEffect(() => {
    setCurrentData({
      first_name: props.first_name ?? "...",
      middle_name: props.middle_name ?? "...",
      last_name: props.last_name ?? "...",
      company_id: props.company_id ?? "...",
      company_str_id: props.company_str_id ?? "...",
      position: props.position ?? "...",
      address: props.address ?? "...",
      mobile_phone: props.mobile_phone ?? "...",
      work_phone: props.work_phone ?? "...",
      fax: props.fax ?? "...",
      email: props.email ?? "...",
      email2: props.email2 ?? "...",
      img: props.img ?? "",
      homepage: props.homepage ?? "...",
      bday: props.bday ?? "...",
      company: props.company ?? "...",
      company_structure: props.company_structure ?? "...",
      uid: props.uid ?? "",
    });
  }, [props]);

  return (
    <div className="card">
      <div className="card-body">
        <div className="form-row mb-3 d-flex justify-content-center">
          <div className="avatar-preview">
            <img
              className="rounded-circle"
              src={
                currentData.img !== "" && currentData.img !== undefined
                  ? process.env.REACT_APP_URL + "/image/" +
                  currentData.uid + "/" + currentData.img
                    : portrait
              }
              alt={currentData.img !== "" ? currentData.img : portrait}
            />
          </div>
        </div>
        <div className="form-row border-contain">
          <div className="form-group col">
            <h4>Профиль</h4>
            <div className="row-custom">
              <span className="lable">Имя:</span>
              <span>{ currentData.first_name }</span>
            </div>
            <div className="row-custom">
              <span className="lable">Отчество:</span>
              <span>{ currentData.middle_name }</span>
            </div>
            <div className="row-custom">
              <span className="lable">Фамилия:</span>
              <span>{ currentData.last_name }</span>
            </div>
            <div className="row-custom">
              <span className="lable">Дата рождения:</span>
              <span>{ currentData.bday }</span>
            </div>
          </div>
        </div>
        <div className="form-row border-contain">
          <div className="form-group col">
            <h4>Контакты</h4>
            <div className="row-custom">
              <span className="lable">Рабочий телефон:</span>
              <span>{ currentData.work_phone }</span>
            </div>
            <div className="row-custom">
              <span className="lable">Мобильный телефон:</span>
              <span>{ currentData.mobile_phone }</span>
            </div>
            <div className="row-custom">
              <span className="lable">E-mail:</span>
              <span>
                <a className="emailto" href={"mailto" + currentData.email}>
                  { currentData.email }
                </a>
              </span>
            </div>
            <div className="row-custom">
              <span className="lable">E-mail (дополнительный):</span>
              <span>{ currentData.email2 }</span>
            </div>
            <div className="row-custom">
              <span className="lable">Факс:</span>
              <span>{ currentData.fax }</span>
            </div>
            <div className="row-custom">
              <span className="lable">Ссылка:</span>
              <span>{ currentData.homepage }</span>
            </div>
          </div>
        </div>
        <div className="form-row border-contain">
          <div className="form-group col">
            <h4>Компания</h4>
            <div className="row-custom">
              <span className="lable">Наименование:</span>
              { <span>{ currentData.company.name }</span> ?? (
                <span>{ currentData.company }</span>
              ) }
            </div>
            <div className="row-custom">
              <span className="lable">Структура:</span>
              { <span>{ currentData.company_structure.str_name }</span> ?? (
                <span>{ currentData.company_structure }</span>
              ) }
            </div>
            <div className="row-custom">
              <span className="lable">Должность:</span>
              <span>{ currentData.position }</span>
            </div>
          </div>
        </div>
        <div className="form-row border-contain">
          <div className="form-group col">
            <h4>Адрес</h4>
            <div className="row-custom">
              <span className="lable">Адрес:</span>
              <span>{ currentData.address }</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RightSide.propTypes = {
  props: PropTypes.object,
};

export default RightSide;