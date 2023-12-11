import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("Введите Имя"),
  middle_name: Yup.string().required("Введите Отчество"),
  last_name: Yup.string().required("Введите Фамилию"),
  company_id: Yup.string().required("Выберите компанию"),
  company_str_id: Yup.string().required("Выберите структуру"),
  email: Yup.string().required("Введите E-mail").email("E-mail не валидный"),
  position: Yup.string().required("Введите позицию"),
  work_phone: Yup.string().required("Введите рабочий номер"),
});