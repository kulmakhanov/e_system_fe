import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
// import PropTypes from "prop-types";
import bsCustomFileInput  from "bs-custom-file-input";
import * as XLSX from "xlsx";
import ShortUniqueId from "short-unique-id";
import { addAddressBook } from "../store/action-creators/addressBookActionCreator";
import SampleExcel from "../media/files/Sample.xlsx";
import { toast } from "react-toastify";

const Import = () => {
  const [data, setData] = useState();
  bsCustomFileInput.init();

  const dispatch = useDispatch();

  const EXTENSIONS = ["xlsx", "xls" ];

  const getExtension = file => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension);
  };

  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach(row => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      row.push(rowData);
    });
    return rows;
  };

  const importExcel = e => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = event => {
      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });

      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];

      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });

      const headers = fileData[0];

      fileData.slice(0, 1);

      setData(convertToJson(headers, fileData));
    };

    if(file) {
      if(getExtension(file)) {
        reader.readAsBinaryString(file);
      }
      else {
        alert("Invalid file input, select Excel");
      }
    }
    else {
      setData([]);
    }
  };

  const addPerson = useCallback(() => {
    try {
      const uid = new ShortUniqueId({ length: 10, dictionary: "alphanum" });

      let i = 0;
      while(i < data.length) {
        let formData = new FormData();
        formData.append("first_name", data[i]["Имя"] ?? "");
        formData.append("middle_name", data[i]["Отчество"] ?? "");
        formData.append("last_name", data[i]["Фамилия"] ?? "");
        formData.append("company_id", data[i]["Компания"] ?? "");
        formData.append("company_str_id", data[i]["Структура"] ?? "");
        formData.append("position", data[i]["Должность"] ?? "");
        formData.append("address", data[i]["Адрес"] ?? "");
        formData.append("mobile_phone", data[i]["Мобильный"] ?? "");
        formData.append("work_phone", data[i]["Рабочий"] ?? "");
        formData.append("fax", data[i]["Факс"] ?? "");
        formData.append("email", data[i]["E-mail"] ?? "");
        formData.append("email2", data[i]["E-mail2"] ?? "");
        formData.append("homepage", data[i]["Ссылка"] ?? "");
        formData.append("bday", data[i]["Дата рождения"] ?? "");
        formData.append("uid", uid());
        formData.append("img", "");

        dispatch(addAddressBook(formData))
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
        i++;
      }

      CloseModal();
    }
    catch(error) {
      console.log(error);
    }
  }, [dispatch, data]);

  const CloseModal = () => {
    var modal = document.getElementById("importModal");
    modal.style.display = "none";
    var backdrop = document.getElementsByClassName("modal-backdrop");
    backdrop[0].remove();
  };

  return (
    <div
      className="modal fade"
      id="importModal"
      tabIndex="-1"
      aria-labelledby="importModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="importModalLabel">
              Импортирование адресной книги
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
            <span>Загрузите <a href={ SampleExcel }>Шаблон </a>и используйте для импорта.</span>
            <div className="input-group mt-3">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile04"
                  accept=".xlsx, xls"
                  aria-describedby="inputGroupFileAddon4"
                  onChange={ importExcel }
                />
                <label className="custom-file-label" htmlFor="inputGroupFile04">
                  Выбрать файл
                </label>
              </div>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-success"
                  type="button"
                  id="inputGroupFileAddon04"
                  onClick={() => addPerson()}
                >
                  Импорт
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Import;