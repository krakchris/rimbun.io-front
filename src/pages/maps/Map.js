import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import { toast } from "react-toastify";
import { visStateLens } from "kepler.gl/reducers";
import {
  injectComponents,
  PanelToggleFactory,
  PanelHeaderFactory,
  withState
} from "kepler.gl/components";
import CustomPanelToggleFactory from "./Panel-toggle";
import CustomPanelHeaderFactory from "./Panel-header";
import './App.css';
import { MAPBOX_ACCESS_TOKEN, EDIT_MAP_INSTANCE_ID } from '../../constants/mapConstant';

import { getMapDataById } from "../../actions/map";
import Loader from "../../components/Loader";


const KeplerGl = injectComponents([
  [PanelHeaderFactory, CustomPanelHeaderFactory],
  [PanelToggleFactory, CustomPanelToggleFactory]
]);

class Map extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    isError: PropTypes.bool, // eslint-disable-line
    errorMessage: PropTypes.string,
    tagNames: PropTypes.array,
    mapData: PropTypes.object
  };

  static defaultProps = {
    isFetching: false,
    isError: false,
    errorMessage: null,
    tagNames: [],
    mapData: null
  };

  componentDidMount() {
    this.loadMapData();
  }

  loadMapData = () => {
    const mapId = this.props.match.params.id;
    mapId
      ? this.props.dispatch(
        getMapDataById({ mapId, mapInstanceId: EDIT_MAP_INSTANCE_ID })
      )
      : toast.error("Please Specify a valid Mapid", {
        position: toast.POSITION.TOP_RIGHT
      });
  }

  render() {
    return (
      <React.Fragment>
        <Loader visible={this.props.isFetching} />
        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
          <AutoSizer>
            {({ height, width }) => (
              <KeplerGl
                mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                id={EDIT_MAP_INSTANCE_ID}
                width={width}
                height={height}
              />
            )}
          </AutoSizer>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tagNames: state.map.tagNames,
    isFetching: state.map.isFetching,
    isError: state.map.isAuthenticated,
    errorMessage: state.map.errorMessage,
    mapData: state.map.mapData,
  };
}

const dispatchToProps = dispatch => ({ dispatch });

export default withRouter(
  connect(
    mapStateToProps,
    dispatchToProps
  )(
    withState(
      // lenses
      [visStateLens],
      // mapStateToProps
      state => ({
        mapState: state.keplerGl,
      })
    )(Map)
  )
);


