import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import portrait from "../../media/img/avatar.png";

const AboutPerson = props => {
  const initialState = {
    first_name: "",
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

  const [info, setInfo] = useState(initialState);

  useEffect(() => {
    setInfo({
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
    <div
      className="modal-fade"
      id={"about-modal" + props.id}
      tabIndex={-1}
      aria-aria-labelledby="aboutModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {info.first_name + " " + info.last_name}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-row mb-3 d-flex justify-content-center">
              <div className="avatar-preview">
                <img
                  className="rounded-circle"
                  src={info.img !== "" && info.img !== undefined ? process.env.REACT_APP_URL + "/image/" + info.uid + "/" + info.img : portrait}
                  alt={info.img !== "" ? info.img : portrait}
                />
              </div>
            </div>
            <div className="form-row border-contain">
              <div className="form-group col">
                <h4>Профиль</h4>
                <div className="row-custom">
                  <span className="lable">Имя</span>
                  <span>{ info.first_name }</span>
                </div>
                <div className="row-cutsom">
                  <span className="lable">Отчество</span>
                  <span>{ info.middle_name }</span>
                </div>
                <div className="row-custom">
                  <span className="lable">Фамилия</span>
                  <span>{ info.last_name }</span>
                </div>
                <div className="row-custom">
                  <span className="lable">Дата рождения</span>
                  <span>{ info.bday }</span>
                </div>
              </div>
            </div>
            <div className="form-row border-contain">
              <div className="form-group col">
                <h4>Контакты</h4>
                <div className="row-custom">
                  <span className="lable">Рабочий телефон:</span>
                  <span>{ info.work_phone }</span>
                </div>
                <div className="row-custom">
                  <span className="lable">Мобильный телефон:</span>
                  <span>{ info.mobile_phone }</span>
                </div>
                <div className="row-custom">
                  <span className="lable">E-mail:</span>
                  <span>{ info.email }</span>
                </div>
                <div className="row-custom">
                  <span className="lable">E-mail (дополнительный):</span>
                  <span>{ info.email2 }</span>
                </div>
                <div className="row-custom">
                  <span className="lable">Факс:</span>
                  <span>{ info.fax }</span>
                </div>
                <div className="row-custom">
                  <span className="lable">Ссылка:</span>
                  <span>{ info.homepage }</span>
                </div>
              </div>
            </div>
            <div className="form-row border-contain">
              <div className="form-group col">
                <h4>Компания</h4>
                <div className="row-custom">
                  <span className="lable">Наименование:</span>
                  {<span>{ info.company.name }</span> ?? (
                    <span>{ info.company }</span>
                  )}
                </div>
                <div className="row-custom">
                  <span className="lable">Структура:</span>
                  {<span>{ info.company_structure.str_name }</span> ?? (
                    <span>{ info.company_structure }</span>
                  )}
                </div>
                <div className="row-custom">
                  <span className="lable">Должность:</span>
                  <span>{ info.position }</span>
                </div>
              </div>
            </div>
            <div className="form-row border-contain">
              <div className="form-group col">
                <h4>Адрес</h4>
                <div className="row-custom">
                  <span className="lable">Адрес:</span>
                  <span>{ info.address }</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AboutPerson.propTypes = {
  props: PropTypes.object.isRequired,
};

export default AboutPerson;