import React from 'react';
import PropTypes from "prop-types";
import Spinner from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from './Loader.module.scss';



const Loader = ({ visible }) => {
  return (
    <div className={s.root}>
          {visible ? <div className={s.cover}></div> : null }
          <Spinner
            className={s.loader}
            visible={visible}
            type="Oval"
            color="#28a745"
            height={80}
            width={80}
            />
    </div>
  );

  }

Loader.propTypes = {
    visible: PropTypes.bool.isRequired
};

export default Loader;
