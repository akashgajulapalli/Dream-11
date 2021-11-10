import React from 'react';
import PropTypes from 'prop-types';
import './select.scss';

const Select = (props) => (
    <div className="wrap-input100 ">
        <span className="label-input100">{props.title}</span>
        <select
            name={props.name}
            onChange={props.controlFunc}
            disabled={props.disabled || false}
            value={props.selectedOption || 0}
            className='input100 dropdown'
        >
            {
                (props.placeholder)
                    ? <option value="">{props.placeholder}</option>
                    : null
            }
            {
                (props.options.length)
                    ? props.options.map(opt => {
                        return (
                            <option key={opt.key} value={opt.value}>{opt.value}</option>
                        );
                    })
                    : null
            }
        </select>
        <span className="focus-input100"></span>
    </div>
);

Select.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    selectedOption: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.number
    ]),
    controlFunc: PropTypes.func,
    placeholder: PropTypes.string
};

export default Select;  