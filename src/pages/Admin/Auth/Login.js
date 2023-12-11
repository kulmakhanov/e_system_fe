import React from "react";
import { login } from "../../../store/action-creators/authActionCreator";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";

const Login = props => {
  const initialState = {
    username: "",
    password: "",
  };

  const dispath = useDispatch();

  const { isLoggedIn } = useSelector(state => state.authReducer);
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
  });

  const formik = useFormik({
    initialValues: initialState,
    validationSchema,
    onSubmit: data => {
      dispath(login(data.username, data.password))
        .then(() => {
          props.history.push("/address_book");
        })
          .catch(e => {
            console.log(e);
          });
    },
  });

  if(isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <div className="parent">
      <div className="cloud">
        <div className="wrapper" onSubmit={ formik.handleSubmit }>
          <form className="login">
            <p className="title">Log in</p>
            <input
              type="text"
              placeholder="username"
              name="username"
              autoFocus
              className={ "form-control" + (formik.errors.username ? "is-invalid" : "") }
              value={ formik.values.username }
              onChange={ formik.handleChange }
            />
            <i className="bi bi-person-circle"></i>
            <div className="valid-feedback">
              { formik.errors.username ? formik.errors.username : null }
            </div>
            <input
              type="password"
              placeholder="password"
              name="password"
              className={ "form-control" + (formik.errors.password ? "is-invalid" : "") }
              value={ formik.values.password }
              onChange={ formik.handleChange }
            />
            <i className="bi bi-key-fill"></i>
            <div className="valid-feedback">
              { formik.errors.password ? formik.errors.password : null }
            </div>
            { message && (
              <div className="alert alert-danger" role="alert">{ message }</div>
            ) }
            <div className="footer">
              <button type="submit">
                <span>Log in</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;