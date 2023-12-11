import React from "react";

export const FormSelect = ({ cname, name, listener, rows = [], feedback }) => {
  return (
    <>
      <select
        className={ "custom-select" + cname }
        name={ name }
        onChange={ listener }
      >
        <option defaultValue>...</option>
        { rows.map(el => {
          return (
            <option value={ el.id } key={ el.id }>
              { el.name }
            </option>
          );
        }) }
      </select>
      <div className="invalid-feedback">{ feedback }</div>
    </>
  );
};