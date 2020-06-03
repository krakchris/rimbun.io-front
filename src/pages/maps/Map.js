import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { processCsvData } from "kepler.gl/processors";
import { toast } from "react-toastify";
import KeplerGlSchema from "kepler.gl/schemas";
import { visStateUpdaters, visStateLens } from "kepler.gl/reducers";
import { wrapTo, addDataToMap, updateMap } from "kepler.gl/actions";
import {
  injectComponents,
  PanelToggleFactory,
  PanelHeaderFactory,
  withState
} from "kepler.gl/components";
import CustomPanelToggleFactory from "./Panel-toggle";
import CustomPanelHeaderFactory from "./Panel-header";
import './App.css';
import s from './Map.module.scss';
import { MAPBOX_ACCESS_TOKEN } from '../../constants';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Button
} from "reactstrap";
import { getTagNames, getMapDataByTag } from "../../actions/map";
import Loader from "../../components/Loader";
import { generateMapImage } from 'kepler.gl/actions';

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

    this.state = {
      dropdownOpen: false,
      selectValue: "Select Tag Name",
      selectedTagId: "",
    };
  }

  componentDidMount() {
    // this.props.dispatch(getTagNames());
  }

  toggle = () => {
    this.setState((prevState, props) => {
      console.log("dropdpwn state===>", prevState.dropdownOpen);
      return { dropdownOpen: !prevState.dropdownOpen };
    });
}
  handleChange = e => {
      const selectedTagId = e.currentTarget.getAttribute("tagid");
      this.setState({
        selectValue: e.currentTarget.textContent,
        selectedTagId
      });
  };

    handleBack = () => {
        // this.props.history.push("/app/main");
      console.log('features', this.props.mapState.visState.editor);
    }

 loadMapData = () => {
     const { selectedTagId } = this.state; 
     selectedTagId
       ? this.props.dispatch(getMapDataByTag({ selectedTagId: selectedTagId }))
       : toast.error("Please Select Tag Name!", {
           position: toast.POSITION.TOP_RIGHT
         });
 }

  generateImage = () => {
    this.props.dispatch(generateMapImage({
      dmension: { width: 500, height: 500, resolution: 2 },
      onUpdate: (dataUrl) => console.log(dataUrl)
    })
    );
  }

  render() {
    const { tagNames } = this.props;
    console.log("tagNames===>", tagNames);

      const dropdownItem = (tagNames) ? tagNames.map(ele => {
        return (
          <DropdownItem
            tagid={ele._id}
            key={ele._id}
            onClick={this.handleChange}
          >
            {ele.tagName}
          </DropdownItem>
        );
    }): null;

    return (
      <div className={s.MapContainer}>
        <Loader visible={this.props.isFetching} />
        <Row>
          <KeplerGl
            id="adminMap"
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
            width={window.innerWidth}
            height={window.innerHeight - 100}
          />
        </Row>
        <Row>
          <div className="mt-3 mb-3 ml-5">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>{this.state.selectValue}</DropdownToggle>
              <DropdownMenu>{dropdownItem}</DropdownMenu>
            </Dropdown>
          </div>
          <div>
            <Button
              color="success"
              className="mt-3 mb-3 ml-1"
              onClick={this.loadMapData}
            >
              Load Data
            </Button>
            <Button
              onClick={this.handleBack}
              className="pull-right mt-3 mb-3 ml-2 "
            >
              Back
            </Button>
          </div>
        </Row>
      </div>
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


// export default withRouter(connect(mapStateToProps)(Map));

