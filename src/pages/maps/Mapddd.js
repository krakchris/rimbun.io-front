import React, { useState } from 'react';
import { connect, useDispatch } from "react-redux";
// import { withRouter } from "react-router-dom";
import { processCsvData } from 'kepler.gl/processors';
import { toast } from 'react-toastify';
import KeplerGlSchema from 'kepler.gl/schemas';
import { visStateUpdaters } from 'kepler.gl/reducers';
import {
    wrapTo,
    addDataToMap,
    updateMap,
} from 'kepler.gl/actions';
import { injectComponents, PanelToggleFactory, PanelHeaderFactory } from 'kepler.gl/components';
import CustomPanelToggleFactory from './Panel-toggle';
import CustomPanelHeaderFactory from './Panel-header';
import store from '../../store';
import testData from './datasets/data';
import './App.css';
import s from './Map.module.scss';
import { MAPBOX_ACCESS_TOKEN } from '../../constants';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Button,
  Label
} from "reactstrap";


const KeplerGl = injectComponents([
    [PanelHeaderFactory, CustomPanelHeaderFactory],
    [PanelToggleFactory, CustomPanelToggleFactory]
]);

//to check empty object
function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

const RemoveUploadedData = () => {
    // // returns uploaded Data on map
    const dataToSave =
        KeplerGlSchema.getDatasetToSave(store.getState().keplerGl.waterBodies);

    // // returns uploaded layer config on map
    const configToSave =
        KeplerGlSchema.getConfigToSave(store.getState().keplerGl.waterBodies);

    var layerConfigs = configToSave.config.visState.layers;

    // // Removed each uploaded layers
    if (configToSave && layerConfigs.length > 0) {
        for (var i = 0; i < layerConfigs.length; i++) {
            store.getState().keplerGl.waterBodies.visState =
                visStateUpdaters.removeDatasetUpdater(
                    store.getState().keplerGl.waterBodies.visState,
                    { key: dataToSave[i].data.id }
                )
        }
    }
}

const Map = () => {
  console.log('jssassas');
  const [windowDimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight - 150
  });
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectValue, setSelectedValue] = useState("Select Tag Name");
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleChange = e => {
    setSelectedValue(e.currentTarget.textContent);
  };

  const updatedMap = () => {
    // wrapTo('waterBodies',
    //     dispatch(
    //         updateMap({ zoom: 9.77291649068545 })
    //     ));
  };

  const uploadCSV = sampledata => {
    wrapTo(
      "waterBodies",
      dispatch(
        addDataToMap({
          datasets: {
            info: {
              label: "waterBodies.csv",
              id: "test_data"
            },
            data: sampledata
          },
          options: {
            centerMap: true,
            readOnly: false
          },
          config: {}
        })
      )
    );
  };

  // const getDropDownData = () => {
  //   this.props.dispatch(getTagNames());
  // };

  React.useEffect(() => {
    // getDropDownData();
    let localData = JSON.parse(localStorage.getItem("data"));
    if (!localData) {
      localData = testData;
    }
    let initialdata;
    if (selectValue === "water_bodies") {
      localData
        ? (initialdata = {
            rows: localData.datasets[0].data.allData,
            fields: localData.datasets[0].data.fields
          })
        : (initialdata = processCsvData(localData));
    }

    {
      RemoveUploadedData();
    }
    isEmpty(initialdata)
      ? toast.warning("No file is loaded !", {
          position: toast.POSITION.TOP_RIGHT
        })
      : uploadCSV(initialdata);

    {
      updatedMap();
    }
  }, [dispatch, selectValue]);

  return (
    <div className={s.MapContainer}>
      <Row>
        <KeplerGl
          id="waterBodies"
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          width={windowDimension.width}
          height={windowDimension.height}
        />
      </Row>
      <Row>
        <div className={s.loadData}>
          <Label for="input-tagName">
            <b>Load Map Data</b>
          </Label>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>{selectValue}</DropdownToggle> 
            <DropdownMenu>
              <DropdownItem header>Tag Name</DropdownItem>
              <DropdownItem onClick={handleChange}>water_bodies</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>
          <Button className={s.backFooter}>Back</Button>
        </div>
      </Row>
    </div>
  );
};

// function mapStateToProps(state) {
//   return {
//     isFetching: state.map.isFetching,
//     isError: state.map.isError,
//     errorMessage: state.map.errorMessage
//   };
// }


export default Map;

