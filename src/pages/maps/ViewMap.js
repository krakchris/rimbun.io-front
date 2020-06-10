import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { withRouter } from "react-router-dom";
import { visStateLens } from 'kepler.gl/reducers';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { injectComponents, PanelToggleFactory, PanelHeaderFactory, MapPopoverFactory, withState } from 'kepler.gl/components';
import { wrapTo } from 'kepler.gl/actions'
import CustomPanelToggleFactory from './Panel-toggle';
import CustomPanelHeaderFactory from './Panel-header';
import CustomPopOverFactory from './Pop-over'
import Chart from './chart';
import Loader from "../../components/Loader";
import { getMapDataById } from '../../actions/map'
import { getChart, chartFailure } from '../../actions/chart';
import { hideSidePanel } from '../../actions/map';
import { MAPBOX_ACCESS_TOKEN, VIEW_MAP_INSTANCE_ID } from '../../constants/mapConstant';
import './viewMap.css';



const KeplerGl = injectComponents([
    [MapPopoverFactory, CustomPopOverFactory],
]);

//to check empty object
function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

class Official extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }


    componentDidMount() {
        this.props.dispatch(wrapTo(VIEW_MAP_INSTANCE_ID, hideSidePanel()))
        this.viewMapData();
    }

    viewMapData() {
        const mapId = this.props.match.params.id;
        const instance = 'viewMap';
        mapId
            ? this.props.dispatch(
                getMapDataById({ mapId, mapInstanceId: VIEW_MAP_INSTANCE_ID })
            )
            : toast.error("Please Specify a valid Mapid", {
                position: toast.POSITION.TOP_RIGHT
            });
    }

    handleBack = () => {
        this.props.history.push('/app');
    }
    render() {

        return (
            <React.Fragment>
                <Loader visible={this.props.isFetching} />
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '80%' }}>
                        <AutoSizer>
                            {({ height, width }) => (
                                <KeplerGl
                                    id="viewMap"
                                    mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                                    width={width}
                                    height={window.innerHeight}
                                />
                            )}
                        </AutoSizer>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1, width: '25%', height: '579px', background: 'grey' }}>

                        {this.props.mapState ?
                            (!isEmpty(this.props.mapState.visState.editor.selectedFeature) && this.props.mapState.visState.editor.features.length == 0)
                                ? <Chart data={this.props.mapState.visState.layerData[0].data} coord={this.props.mapState.visState.layerData[1].data} />
                                : <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px 18px' }}>Please draw layer on map to view data visualization on chart </span>
                            : null}

                        {this.props.mapState ?
                            (!isEmpty(this.props.mapState.visState.editor.selectedFeature) && this.props.mapState.visState.editor.features.length == 0)
                                ? <div style={{ background: '#ccc', textAlign: 'center' }}>
                                    <button onClick={this.handleBack} style={{ background: 'none', border: 'none', fontSize: '18px' }}>
                                        Back </button>
                                </div> : null : null}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        isVisible: state.chart.isVisible,
        isFetching: state.map.isFetching,
    };
}



export default withRouter(
    connect(mapStateToProps)(
        withState(
            // lenses
            [visStateLens],
            // mapStateToProps
            state => ({ mapState: state.keplerGl.viewMap })
        )(Official)
    )
);

