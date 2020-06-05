import { toast } from "react-toastify";
import api, { endPoints } from "../api";
import {  addDataToMap } from "kepler.gl/actions";
import { processCsvData } from "kepler.gl/processors";

export const MAP_REQUEST = "MAP_REQUEST";
export const MAP_SUCCESS = "MAP_SUCCESS";
export const MAP_FAILURE = "MAP_FAILURE";



function requestMapData() {
    return {
        type: MAP_REQUEST,
        isFetching: true,
        isError: false,
    };
}

export function mapDataSucess(data) {
    return {
        type: MAP_SUCCESS,
        isFetching: false,
        isError: false,
        data
    };
}

function mapDataFail(message) {
    return {
        type: MAP_FAILURE,
        isFetching: false,
        isError: true,
        message
    };
}


export function getMapDataById(data) {
    const { mapId } = data;
    return dispatch => {
        dispatch(requestMapData());
        api(endPoints.getMapDataByID)
          .getOne({ id: mapId })
          .then(response => {
            const dataset = response.data.data.doc.master;
            const config = response.data.data.doc.config;
            prepareKeplerData(dataset);
            dispatch(
            addDataToMap({
                datasets: prepareKeplerData(dataset),
                config: config
            })
            );
            dispatch(mapDataSucess());
          })
          .catch(error => {
            const errorMessage = error.response
              ? error.response.data.message
              : "Server error Occurred";
            toast.error(errorMessage, {
              position: "top-right",
              autoClose: 5000,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true
            });
            dispatch(mapDataFail());
          });
    }

}


function prepareKeplerData(dataset){
    const finalDatasets = dataset.map((item) => {
        // Use processCsvData helper to convert csv file into kepler.gl structure {fields, rows}
        const datasetItem = processCsvData(item.file);
        return ({
          data: datasetItem,
          info: {
            // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
            // It is paramount that this id matches your configuration otherwise the configuration file will be ignored.
            id: "editMap"
          }
        });

    });
    return finalDatasets;
    
}