
export function requestChart() {
    console.log('requestChart')
    return {
        type: 'REQUEST_CHART',
    }
}

function chartSuccess() {
    return {
        type: 'CHART_SUCCESS'
    }
}
function chartLoaded() {
    return {
        type: 'CHART_LOADED'
    }
}

export function getChart() {
    return dispatch => {
        dispatch(requestChart());
        dispatch(chartSuccess()).
            then(res => {
                dispatch(chartLoaded())
            })
    }
}

export function chartFailure() {
    return {
        type: 'CHART_FAILURE',
    }
}
