import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { processCsvData } from "kepler.gl/processors";
import { toast } from "react-toastify";
import KeplerGlSchema from "kepler.gl/schemas";
import { visStateUpdaters } from "kepler.gl/reducers";
import { wrapTo, addDataToMap, updateMap } from "kepler.gl/actions";
import {
  injectComponents,
  PanelToggleFactory,
  PanelHeaderFactory
} from "kepler.gl/components";
import CustomPanelToggleFactory from "./Panel-toggle";
import CustomPanelHeaderFactory from "./Panel-header";
import './App.css';
import s from './Map.module.scss';
import { MAPBOX_ACCESS_TOKEN } from '../../constants';
import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Button,
    Label
} from "reactstrap";
import { getTagNames, getMapDataByTag } from "../../actions/map";
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
      selectedTagId: ""
    };
  }

  componentDidMount() {
    this.props.dispatch(getTagNames());
  }

  toggle = () => {
    this.setState((prevState, props) => {
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
        this.props.history.push("/app/main");
    }

 loadMapData = () => {
     const { selectedTagId } = this.state; 
     selectedTagId
       ? this.props.dispatch(getMapDataByTag({ selectedTagId: selectedTagId }))
       : toast.error("Please Select Tag Name!", {
           position: toast.POSITION.TOP_RIGHT
         });
 }

  render() {
    const { tagNames } = this.props;

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
            theme="light"
          />
        </Row>
        <Row>
        <div className="mt-3 mb-3 ml-5" >
            <ButtonDropdown
              color="primary"
              isOpen={this.state.dropdownOpen}
              toggle={this.toggle}
              className="mr-xs"
            >
              <DropdownToggle caret color="danger">
                {this.state.selectValue}
              </DropdownToggle>
              <DropdownMenu>{dropdownItem}</DropdownMenu>
            </ButtonDropdown>
          </div>
          <div>
            <Button color="success" className="mt-3 mb-3 ml-1" onClick={this.loadMapData}>Load Data</Button>
            <Button onClick={this.handleBack} className="pull-right mt-3 mb-3 ml-2 ">Back</Button>
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

export default withRouter(connect(mapStateToProps)(Map));

