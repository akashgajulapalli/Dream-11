// npm dependencies
import React from 'react';
import { Link } from "react-router-dom";

// css imports
import './dependencies.scss';

/**
 * FUNCTIONAL COMPONENT : This component holds displaying image and its properties.
 * @param {object}    props    It carries image path and alternative name of image.
 */
export const Imagefield = (props) => <img className='card-img' src={props.image} alt={props.alt} />;

/**
 * FUNCTIONAL COMPONENT : This component holds the structure of displaying the title fields.
 * @param {object}    props    It carries the title name to be displayed.
 */
export const Titlefield = (props) => <h5 className='card-title'>{props.title}</h5>;

/**
 * FUNCTIONAL COMPONENT : This component holds the structure of displaying the text fields.
 * @param {object}    props    It carries the text name to be displayed.
 */
export const Textfield = (props) => <span class="txt1">{props.text}</span>

export const Button = (props) =>
    <div className="wrap-login100-form-btn">
        <div className="login100-form-bgbtn"></div>
        <button
            className="login100-form-btn"
            onClick={props.controlFunc}>
            {props.name}
        </button>
    </div>

export const LinkField = (props) =>
    <Link
        to={props.url}
        className="dis-block txt3 hov1 p-r-30 p-t-10 p-b-10 p-l-30">
        {props.name}
    </Link>

export const MessageField = (props) =>
    <h4 className="dis-block txt3 p-b-20 ">{props.text}</h4>
