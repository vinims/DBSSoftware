import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, type, options, ...otherProps }) => (
  <div className='group'>
    {(() => {
      if (type === "select") {
        return (
          <div>
            {label ? (
              <label
                className="form-select-label"
              >
                {label}
              </label>
            ) : null}
            <select className='form-input' {...otherProps} onChange={handleChange}>
              {options.map((value, index) => {
                return <option key={index}>{value}</option>
              })}
            </select>
          </div>
        )
      } else {
        return (
          <div>
            <input className='form-input' onChange={handleChange} {...otherProps} />
            {label ? (
              <label
                className={`${
                  otherProps.value.length ? 'shrink' : ''
                  } form-input-label`}
              >
                {label}
              </label>
            ) : null}
          </div>
        )
      }
    })()}


  </div>
);

export default FormInput;
