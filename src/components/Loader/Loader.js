import React from 'react';
import PropTypes from "prop-types";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Progress from 'react-redux-progress/renderprops';
import s from './Loader.module.scss';


const Loader = ({ visible, isPercentage }) => {
  return (
    <div className={s.root}>
      {isPercentage ?
        <Progress isActive={visible}>
          {percent =>
            <React.Fragment>
              {percent === undefined ? percent = 0 : null}
              {(Math.trunc(percent) > 0 && (Math.trunc(percent) <= 100) || visible) ?
                <div className={s.cover}>
                  <div className={s.loader}>
                    <CircularProgressbar
                      value={percent}
                      minValue={1}
                      maxValue={100}
                      text={`${percent < 0 ? 100 : Math.trunc(percent)}%`}
                      styles={buildStyles({
                        pathColor: '#28a745',
                        textColor: '#28a745',
                      })}
                    />
                  </div>
                </div>
                : null}
            </React.Fragment>
          }
        </Progress> :
        <Progress isActive={visible}>
          {percent =>
            <React.Fragment>
              {percent === undefined ? percent = 0 : null}
              {(Math.trunc(percent) > 0 && (Math.trunc(percent) <= 100) || visible) ?
                <div className={s.cover}>
                  <div className={s.loader}>
                    <CircularProgressbar
                      value={percent}
                      minValue={1}
                      maxValue={100}
                      styles={buildStyles({
                        pathColor: '#28a745',
                      })}
                    />
                  </div>
                </div>
                : null}
            </React.Fragment>
          }
        </Progress>
      }
    </div>
  );
}

Loader.propTypes = {
  visible: PropTypes.bool.isRequired
};

export default Loader;
