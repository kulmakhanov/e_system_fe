import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../store/action-creators/authActionCreator";
import { toast } from "react-toastify";
import { FormSelect } from "../../../components/elements/Select";
import { getRole } from "../../../store/action-creators/userActionCreator";
// import { clearMessage } from "../../../store/action-creators/messageActionCreator";

const Register = props => {
  const initialState = {
    username: "",
    email: "",
    password: "",
    company_id: "",
    role_id: "",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRole());
  }, [dispatch]);

  // const [loading, setLoading] = useState(false);
  const company = useSelector(state => state.companyReducer);
  const role = useSelector(state => state.userReducer.role);
  const { message } = useSelector(state => state.messageReducer);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
        .min(5, "Username must be at least 6 characters")
          .max(20, "Username must not exceed 20 characters"),
    password: Yup.string()
      .required("Password is required")
        .min(6, "Password must be at least 6 characters")
          .max(40, "Password must not exceed 40 characters"),
    email: Yup.string().required("E-mail is required").email("E-mail is invalid"),
    role_id: Yup.string().required("Role is required"),
  });

  const formik = useFormik({
    initialValues: initialState,
    validationSchema,
    onSubmit: data => {
      dispatch(
        register(
          data.username,
          data.email,
          data.password,
          data.company_id,
          data.role_id,
        )
      )
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
    },
  });

  const CloseModal = () => {
    var modal = document.getElementById("RegisterModal");
    modal.style.display = "none";
    var backdrop = document.getElementsByClassName("modal-backdrop");
    backdrop[0].remove();
  };

  return (
    <div
      className="modal"
      id="RegisterModal"
      tabIndex="-1"
      aria-labelledby="RegisterModalLabel"
      aria-hidden="true"  
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="wrapper" onSubmit={ formik.handleSubmit }>
            <form className="login">
              <p className="title">Register</p>
              <input
                type="text"
                placeholder="username"
                name="username"
                autoFocus
                className={ "form-control" + (formik.errors.username ? "is-invalid" : "") }
                value={ formik.values.username }
                onChange={ formik.handleChange }
              />
              <i className="bi bi-person-circle" />
              <div className="valid-feedback">
                { formik.errors.username ? formik.errors.username : null }
              </div>
              <input
                type="text"
                placeholder="email"
                name="email"
                autoFocus
                className={ "form-control" + (formik.errors.email ? "is-invalid" : "") }
                value={ formik.values.email }
                onChange={ formik.handleChange }
              />
              <i className="bi bi-envelope" />
              <div className="valid-feedback">
                { formik.errors.email ? formik.errors.email : null }
              </div>
              <input
                type="password"
                placeholder="password"
                name="password"
                className={ "form-control" + (formik.errors.password ? "is-invalid" : "") }
                value={ formik.values.password }
                onChange={ formik.handleChange }
              />
              <i className="bi bi-key-fill" />
              <div className="valid-feedback">
                { formik.errors.password ? formik.errors.password : null }
              </div>
              <FormSelect
                cname={ formik.errors.company_id ? "is-invalid mb-2" : "mb-2" }
                name={ "company_id" }
                listener={ formik.handleChange }
                rows={ company }
                feedback={ formik.errors.company_id ? formik.errors.company_id : null }
              />
              <FormSelect
                cname={ formik.errors.role_id ? "is-invalid" : "" }
                name={ "role_id" }
                listener={ formik.handleChange }
                rows={ role }
                feedback={ formik.errors.role_id ? formik.errors.role_id : null }
              />
              { message && (
                <div className="alert alert-danger" role="alert">{ message }</div>
              ) }
              <div className="footer">
                <button type="button" data-dismiss="modal">Отмена</button>
                <button type="submit">
                  <span className="state">Добавить</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;