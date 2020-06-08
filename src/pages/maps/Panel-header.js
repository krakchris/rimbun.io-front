import React from 'react';
import { withState } from 'kepler.gl/components';
import { visStateLens } from "kepler.gl/reducers";
import Icon from "../../components/Icon";
import s from './Map.module.scss';

const CustomHeader = (props) => {
    console.log('props in headre--->', props);
    return (
        <div className={s.keplerLogo}>
            <Icon glyph="logo" />
            <p><span>{(props.mapData) ? props.mapData.name : 'Loading....' }</span></p>
        </div>
    )

}
   

// const CustomPanelHeaderFactory = () => CustomHeader;

const CustomPanelHeaderFactory = () =>
  withState(
    // lenses
    [visStateLens],
    // mapStateToProps
    state => ({
      mapData: state.map.mapData
    }),
    )(CustomHeader);

export default CustomPanelHeaderFactory;