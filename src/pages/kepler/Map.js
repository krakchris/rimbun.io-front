import React, { useState } from 'react';
import { useDispatch, Provider } from 'react-redux';
import { processCsvData } from 'kepler.gl/processors';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
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
import store from './store'
import testData from './datasets/data';
import './App.css';
import s from './Map.module.scss';





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

function BasicMap() {
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectValue, setSelectedValue] = useState('select file');
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const handleChange = (e) => {
        setSelectedValue(e.currentTarget.textContent)
    }

    const updatedMap = () => {
        wrapTo('waterBodies',
            dispatch(
                updateMap({ zoom: 9.77291649068545 })
            ));
    }

    const uploadCSV = (sampledata) => {
        wrapTo('waterBodies',dispatch(
            addDataToMap({
              datasets: {
                info: {
                  label: 'waterBodies.csv',
                  id: 'test_data'
                },
                data: sampledata
              },
              options: {
                centerMap: true,
                readOnly: false
              },
              config: {}
            })
          ));
    }

    React.useEffect(() => {
        let localData = JSON.parse(localStorage.getItem('data'));
        if (!localData) {
            localData = testData;
        }
        let initialdata;
        if (selectValue === 'water_bodies') {
            localData ? initialdata = { 
             rows:localData.datasets[0].data.allData,
             fields:localData.datasets[0].data.fields
            }
            : initialdata = processCsvData(localData);
        }

        { RemoveUploadedData() }
        isEmpty(initialdata) ?
            toast.warning("No file is loaded !", {
                position: toast.POSITION.TOP_RIGHT,
            }) : uploadCSV(initialdata)


        { updatedMap() }

    }, [dispatch, selectValue]);

    return (
        <div className={s.MapContainer}>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    {selectValue}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>File</DropdownItem>
                    <DropdownItem onClick={handleChange}>water_bodies</DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <KeplerGl
                id="waterBodies"
                mapboxApiAccessToken='pk.eyJ1IjoiaGFycnlwb3R0ZXJob2d3YXJ0cyIsImEiOiJjazlsMHRpemUwNDR2M2RtdWh4c2Zua3hwIn0.wqFhsCs4K3yry-dxeTDa4A'
                width={window.innerWidth}
                height={window.innerHeight}
            />
        </div>
    );
}

const Map = () => {
    return (
        <Provider store={store}>
            <BasicMap />
        </Provider>
    )
}

export default Map;
