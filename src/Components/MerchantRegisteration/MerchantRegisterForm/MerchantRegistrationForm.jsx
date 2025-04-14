import React, { useReducer, useState } from 'react';
import { reducer, initialState } from './Reducer';
import { validateField, requiredFields, filterInput } from './validation';
import { fields } from './fields';
import "../Register.css";

function MerchantRegistrationForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState({});

  const startIndex = state.currentFrame * 5;
  const visibleFields = fields.slice(startIndex, startIndex + 5);

  const importantFields = ['email', 'contactPhoneNumber', 'bankAccountNumber'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    // Filter input for non-important fields
    const filteredValue = importantFields.includes(name) ? fieldValue : filterInput(name, fieldValue);

    dispatch({ type: 'UPDATE_FIELD', field: name, value: filteredValue });

    // Only validate and show errors for important fields
    if (importantFields.includes(name)) {
      const validationResult = validateField(name, filteredValue);
      setErrors(prev => ({
        ...prev,
        [name]: validationResult === true ?
          (requiredFields.includes(name) && (!filteredValue && filteredValue !== false) ?
            'This field is required' : '') :
          validationResult
      }));
    } else {
      setErrors(prev => ({ ...prev, [name]: '' })); // Clear errors for non-important fields
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    fields.forEach(field => {
      const fieldValue = state[field.name];
      const validationResult = validateField(field.name, fieldValue);
      if (importantFields.includes(field.name) && validationResult !== true) {
        newErrors[field.name] = validationResult;
      } else if (requiredFields.includes(field.name) && (!fieldValue && fieldValue !== false)) {
        newErrors[field.name] = 'This field is required';
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', state);
    }
  };

  return (
    <div className="merchant-form-container">
      <h2>Merchant Registration</h2>
      <div className='form-wrapper'>
        <div className="merchant-form">
          {visibleFields.map((field) => (
            <div key={field.name} className="form-group">
              <label>
                {field.label}:
                {field.type === 'checkbox' ? (
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={state[field.name] || false}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={state[field.name] || ''}
                    onChange={handleChange}
                    className="form-input"
                  />
                )}
              </label>
              {errors[field.name] && <span className="error">{errors[field.name]}</span>}
            </div>
          ))}
          <div className="form-buttons">
            <button
              type="button"
              onClick={() => dispatch({ type: 'PREV_FRAME' })}
              disabled={state.currentFrame === 0}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: 'NEXT_FRAME' })}
              disabled={state.currentFrame === Math.ceil(fields.length / 5) - 1}
            >
              Next
            </button>
          </div>
          {state.currentFrame === Math.ceil(fields.length / 5) - 1 && (
            <button type="button" onClick={handleSubmit} className="submit-button">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MerchantRegistrationForm;