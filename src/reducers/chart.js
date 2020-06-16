
export default function (state = {
    isVisible: false,
    isFetching: false
}, action) {
    switch (action.type) {
        case 'CHART_SUCCESS':
            return Object.assign({}, state, {
                isVisible: true,
                isFetching: false
            });
        case 'CHART_FAILURE':
            return Object.assign({}, state, {
                isVisible: false
            })
        case 'CHART_LOADED':
            return Object.assign({}, state, {
                isFetching: false
            })
        case 'REQUEST_CHART':
            return Object.assign({}, state, {
                isFetching: true
            });
        default:
            return state;
    }
}
