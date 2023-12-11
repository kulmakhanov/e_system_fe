import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddressBook } from "../../../store/action-creators/addressBookActionCreator";
import portrait from "../../../media/img/avatar.png";
import { useFormik } from "formik";
import { validationSchema } from "../../../utils/validationSchema";
import ShortUniqueId from "short-unique-id";
import { toast } from "react-toastify";

const AddPerson = () => {
  const [loading, setLoading] = useState(false);
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
    previewImg: undefined,
  };

  const dispatch = useDispatch();
  const uid = new ShortUniqueId({ length: 10, dictionary: "alphanum" });
  const company = useSelector(state => state.companyReducer);
  const companyStr = useSelector(state => state.companyStrReducer);

  const selectImg = event => {
    const files = event.currentTarget.files[0];
    const previewImg = URL.createObjectURL(event.currentTarget.files[0]);
    formik.setFieldValue("img", files);
    formik.setFieldValue("previewImg", previewImg);
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema,
    onSubmit: data => {
      setLoading(true);
      let formData = new FormData()
      formData.append("first_name", data.first_name);
      formData.append("middle_name", data.middle_name);
      formData.append("last_name", data.last_name);
      formData.append("company_id", data.company_id);
      formData.append("company_str_id", data.company_str_id);
      formData.append("position", data.position);
      formData.append("address", data.address);
      formData.append("mobile_phone", data.mobile_phone);
      formData.append("work_phone", data.work_phone);
      formData.append("fax", data.fax);
      formData.append("email", data.email);
      formData.append("email2", data.email2);
      formData.append("homepage", data.homepage);
      formData.append("bday", data.bday);
      formData.append("uid", uid());
      formData.append("img", data.img ?? "");

      dispatch(addAddressBook(formData))
        .then(message => {
          toast.success(message, {
            theme: "colored",
          });
          setTimeout(() => {
            setLoading(false)
          }, 200);
          CloseModal();
          formik.handleReset();
        })
          .catch(e => {
            toast.error(e, {
              theme: "colored",
            });
            setLoading(false);
          });
    },
  });

  const CloseModal = () => {
    var modal = document.getElementById("addModal");
    modal.style.display = "none";
    var backdrop = document.getElementsByClassName("modal-backdrop");
    backdrop[0].remove();
  };

  return (
    <div
      className="modal fade"
      id="addModal"
      tabIndex={-1}
      aria-labelledby="addModalLable"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="AddModalLabel">Добавить контакт</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={formik.handleReset}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group col">
                  <div className="avatar-upload">
                    <div className="avatar-edit">
                      <input
                        type="file"
                        id="imageUpload"
                        accept=".png, .jpg, .jpeg"
                        onChange={selectImg}
                      />
                      <label htmlFor="imageUpload">
                        <i className="bi bi-pencil-fill" />
                      </label>
                    </div>
                    <div className="avatar-preview">
                      <img
                        id="imagePreview"
                        className="rounded-circle"
                        src={formik.values.previewImg !== undefined ? formik.values.previewImg : portrait}
                        alt="portrait"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="inputFirstName">Имя</label>
                  <input
                    type="text"
                    className={`form-control ${formik.errors.first_name ? "is-invalid" : ""}`}
                    id="firstName"
                    name="first_name"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    placeholder="Имя"
                  />
                  <div className="invalid-feedback">
                    {formik.errors.first_name ? formik.errors.first_name : null}
                  </div>
                </div>
                <div className="form-group col">
                  <label htmlFor="inputMiddleName">Отчество</label>
                  <input
                    type="text"
                    className={`form-control ${formik.errors.middle_name ? "is-invalid" : ""}`}
                    id="middleName"
                    name="middle_name"
                    value={formik.values.middle_name}
                    onChange={formik.handleChange}
                    placeholder="Отчество"
                  />
                  <div className="invalid-feedback">
                    {formik.errors.middle_name ? formik.errors.middle_name : null}
                  </div>
                </div>
                <div className="form-group col">
                  <label htmlFor="inputLastName">Фамилия</label>
                  <input
                    type="text"
                    className={`form-control ${formik.errors.last_name ? "is-invalid" : ""}`}
                    id="lastname"
                    name="last_name"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    placeholder="Фамилия"
                  />
                  <div className="invalid-feedback">
                    {formik.errors.last_name ? formik.errors.last_name : null}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group-col">
                  <label htmlFor="inputBday">Дата рождения</label>
                  <input
                    type="date"
                    className={`form-control ${formik.errors.bday ? "is-invalid" : ""}`}
                    id="bday"
                    name="bday"
                    value={formik.values.bday}
                    onChange={formik.handleChange}
                  />
                  <div className="invalid-feedback">
                    {formik.errors.bday ? formik.errors.bday : null}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="inputCompany">Компания</label>
                  <select
                    className={`custom-select ${formik.errors.company_id ? "is-invalid" : ""}`}
                    name="company_id"
                    onChange={formik.handleChange}
                    required
                  >
                    <option defaultValue>...</option>
                    {company && company.map((company, indx) => {
                      return (
                        <option key={indx} value={company.id}>
                          {company.name}
                        </option>
                      );
                    })}
                  </select>
                  <div className="invalid-feedback">
                    {formik.errors.company_id ? formik.errors.company_id : null}
                  </div>
                </div>
                <div className="from-group col">
                  <label htmlFor="inputCompany">Структура</label>
                  <select
                    className={`custom-select ${formik.errors.company_str_id ? "is-invalid" : ""}`}
                    name="company_str_id"
                    onChange={formik.handleChange}
                  >
                    <option defaultValue>...</option>
                    {companyStr && companyStr.map((companyStr, indx) => {
                      return (
                        <option key={indx} value={companyStr.id}>
                          {companyStr.str_name}
                        </option>
                      );
                    })}
                  </select>
                  <div className="invalid-feedback">
                    {formik.errors.company_str_id ? formik.errors.company_str_id : null}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="inputPosition">Должность</label>
                  <input
                    type="text"
                    className={`form-control ${formik.errors.position ? "is-invalid" : ""}`}
                    id="position"
                    name="position"
                    value={formik.values.position}
                    onChange={formik.handleChange}
                    placeholder="Должность"
                  />
                  <div className="invalid-feedback">
                    {formik.errors.position ? formik.errors.position : null}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="inputEmail">E-mail</label>
                  <input
                    type="email"
                    className={`form-control ${formik.errors.email ? "is-invalid" : ""}`}
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="E-mail"
                  />
                  <div className="invalid-feedback">
                    {formik.errors.email ? formik.errors.email : null}
                  </div>
                </div>
                <div className="form-group col">
                  <label htmlFor="inputEmail2">E-mail дополнительный</label>
                    <input
                      type="email"
                      className={`form-control ${formik.errors.email2 ? "is-invalid" : ""}`}
                      id="email2"
                      name="email2"
                      value={formik.values.email2}
                      onChange={formik.handleChange}
                      placeholder="E-mail"
                    />
                    <div className="invalid-feedback">
                      {formik.errors.email2 ? formik.errors.email2 : null}
                    </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="inputFax">Факс</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fax"
                    name="fax"
                    value={formik.values.fax}
                    onChange={formik.handleChange}
                    placeholder="Факс"
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="inputHomePage">Сайт</label>
                  <input
                    type="text"
                    className="form-control"
                    id="homepage"
                    name="homepage"
                    value={formik.values.homepage}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="inputPhone">Мобильный телефон</label>
                  <input
                    type="tel"
                    className={`form-control ${formik.errors.mobile_phone ? "is-invalid" : ""}`}
                    id="mobile_phone"
                    name="mobile_phone"
                    value={formik.values.mobile_phone}
                    onChange={formik.handleChange}
                    placeholder="Мобильный"
                  />
                  <div className="invalid-feedback">
                    {formik.errors.mobile_phone ? formik.errors.mobile_phone : null}
                  </div>
                </div>
                <div className="form-group col">
                  <label htmlFor="inputWorkPhone">Рабочий телефон</label>
                  <input
                    type="tel"
                    className={`form-control ${formik.errors.work_phone ? "is-invalid" : ""}`}
                    id="work_phone"
                    name="work_phone"
                    value={formik.values.work_phone}
                    onChange={formik.handleChange}
                    placeholder="Рабочий"
                  />
                  <div className="invalid-feedback">
                    {formik.errors.work_phone ? formik.errors.work_phone : null}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="inputAddress">Адрес</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    placeholder="Адрес"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={formik.handleReset}
              >
                <span>Отмена</span>
              </button>
              <button
                type="submit"
                className="btn btn-primary"
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
                    <span>Сохранить</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPerson;