import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import KeplerGl from "kepler.gl";
import { toast } from "react-toastify";
import KeplerGlSchema from "kepler.gl/schemas";
import Processors from 'kepler.gl/processors';
import { visStateUpdaters, visStateLens } from "kepler.gl/reducers";
import { wrapTo, addDataToMap, updateMap } from "kepler.gl/actions";
import {
  injectComponents,
  PanelToggleFactory,
  PanelHeaderFactory,
  withState
} from "kepler.gl/components";
import { MAPBOX_ACCESS_TOKEN } from '../../constants';

import { getTagNames, getMapDataById } from "../../actions/map";
import Loader from "../../components/Loader";
import sampleData from './datasets/data';
import './App.css';

// const KeplerGl = injectComponents([
//   [PanelHeaderFactory, CustomPanelHeaderFactory],
//   [PanelToggleFactory, CustomPanelToggleFactory]
// ]);

class Map extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    isError: PropTypes.bool, // eslint-disable-line
    errorMessage: PropTypes.string,
    tagNames: PropTypes.array,
    mapData: PropTypes.string
  };

  static defaultProps = {
    isFetching: false,
    isError: false,
    errorMessage: null,
    tagNames: [],
    mapData: ""
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadMapData();
  }

  loadMapData = () => {
    const mapId = this.props.match.params.id;
    const instance = 'map';
    mapId
      ? this.props.dispatch(getMapDataById({ mapId, instance }))
      : toast.error("Please Specify a valid Mapid", {
        position: toast.POSITION.TOP_RIGHT
      });
  }

  render() {
    return (
      <React.Fragment>
        <Loader visible={this.props.isFetching} />
        <div className='view' style={{ position: "absolute", width: "100%", height: "100%" }}>
          <AutoSizer>
            {({ height, width }) => (
              <KeplerGl
                mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                id="map"
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

function mapStateToProps(state) {
  return {
    tagNames: state.map.tagNames,
    isFetching: state.map.isFetching,
    isError: state.map.isAuthenticated,
    errorMessage: state.map.errorMessage,
    mapData: state.map.mapData
  };
}

export default withRouter(
  connect(mapStateToProps)(
    withState(
      // lenses
      [visStateLens],
      // mapStateToProps
      state => ({ mapState: state.keplerGl.adminMap })
    )(Map)
  )
);


