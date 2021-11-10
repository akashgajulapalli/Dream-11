import React from 'react';
import PropTypes from 'prop-types';
import './singleInput.scss';

const SingleInput = (props) => (
    <div className="wrap-input100 ">
        <span className="label-input100">{props.title}</span>
        <input
            className='input100'
            type={props.type}
            name={props.name}
            value={props.content}
            defaultValue={props.defaultValue}
            placeholder={props.placeholder}
            disabled={props.disabled}
            maxLength={props.maxLength ? props.maxLength : '100'}
            onChange={props.controlFunc} />
        <span className="focus-input100"></span>
    </div>
);

SingleInput.propTypes = {
    type: PropTypes.oneOf(['text', 'number', 'password', 'email']).isRequired,
    name: PropTypes.string.isRequired,
    controlFunc: PropTypes.func,
    placeholder: PropTypes.string,
};

export default SingleInput;  