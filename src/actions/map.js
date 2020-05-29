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


export function getMapDataByTag(data) {
    const { selectedTagId } = data;
    const endPoint = `${endPoints.getMapDataByID}${selectedTagId}`;
    return dispatch => {
        dispatch(requestMapData());
        api(endPoint)
          .get({})
          .then(response => {
            const dataset = response.data.data.doc.csv;
            const config = response.data.data.doc.config;
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
    // Use processCsvData helper to convert csv file into kepler.gl structure {fields, rows}
    const data = processCsvData(dataset);
    // Create dataset structure
    return dataset = {
        data,
        info: {
            // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
            // It is paramount that this id matches your configuration otherwise the configuration file will be ignored.
            id: "adminMap"
        }
    };
}