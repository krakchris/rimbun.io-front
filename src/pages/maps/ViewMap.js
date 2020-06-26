import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { withRouter } from "react-router-dom";
import { visStateLens } from 'kepler.gl/reducers';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { injectComponents, MapPopoverFactory, withState } from 'kepler.gl/components';
import { wrapTo } from 'kepler.gl/actions'
import CustomPopOverFactory from './Pop-over'
import Chart from './chart';
import Loader from "../../components/Loader";
import { hideSidePanel, downloadData, getMapDataById } from "../../actions/map";
import { MAPBOX_ACCESS_TOKEN, VIEW_MAP_INSTANCE_ID } from '../../constants/mapConstant';
import Icon from "../../components/Icon";
import cx from "classnames";
import s from './ViewMap.module.scss';



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
            data: [],
            isChartVisible: false
        }
    }


    componentDidMount() {
        this.props.dispatch(wrapTo(VIEW_MAP_INSTANCE_ID, hideSidePanel()))
        this.viewMapData();
    }

    viewMapData() {
        const mapId = this.props.match.params.id;
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

    loadChart = () => {
        if (this.props.mapState) {
            if ((!isEmpty(this.props.mapState.visState.editor.selectedFeature) && this.props.mapState.visState.editor.features.length == 0)) {
                this.setState({ data: this.props.mapState.visState.layerData[0].data, isChartVisible: true })
            }
            else
                toast.error("Please do the layer selection", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    closeOnClick: true,
                })
        }
    }

    downloadFile = () => {
        if (this.props.mapState) {
            if ((!isEmpty(this.props.mapState.visState.editor.selectedFeature) && this.props.mapState.visState.editor.features.length == 0)){

            const activeLayer = (this.props.mapState.visState.layers.length) ?this.props.mapState.visState.layers[0] : null; // by default first layer is the point layer for chart update

            // get the datasetId of PointLayer 
            const activePointLayerDataID = activeLayer.config.dataId;

            // get all the data id points which falls under drawn polygon
            let dataPoints = [];
            activeLayer.data.map((item) => dataPoints.push(item.data[0]));

            // active dataset information retrieved
            const activeDataset = this.props.mapData.master.find((item)=> item._id === activePointLayerDataID);
           
            const apiPayload = {
                "tagname": activeDataset.tagName,
                "data_ids": dataPoints,
                "filepath": activeDataset.file
            }

            //call the api here with this payload
            this.props.dispatch(downloadData(apiPayload));

            }else{
                toast.error("Please do the layer selection", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    closeOnClick: true,
                })
            }
        }
    }
    render() {

        return (
            <React.Fragment>
                <Loader visible={this.props.isFetching} isPercentage />
                <div style={{ display: 'flex' }}>
                    <div className={s.viewMap}>
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
                    <div className={s.chartContainer}>
                        <div className={s.chartLayout}>
                            <div className={s.keplerLogo}>
                                <Icon glyph="logo" onClick={this.handleBack} />
                                <p><span>{(this.props.mapData) ? this.props.mapData.name : 'Loading....'}</span></p>
                            </div>
                            {this.props.mapState ?
                                this.state.isChartVisible
                                    ? <Chart data={this.state.data} />
                                    : <div className={s.defaultMsg}>
                                        <p>Please draw layer on map to view data visualization on chart</p>
                                    </div>

                                : null}
                        </div>
                        {this.props.mapState ?
                            <>
                                <div className={s.actionContainer}>
                                    <button onClick={this.loadChart} className={s.chartButton}>
                                        <i className={cx(
                                            "glyphicon glyphicon-repeat",
                                            s.alignIcons
                                        )} />
                                        Update </button>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-around', background: '#ffe1e0' }}>
                                    <button onClick={this.downloadFile} className={s.chartButton}>
                                        <i className={cx(
                                            "glyphicon glyphicon-file",
                                            s.alignIcons
                                        )} />
                                    </button>

                                    <button className={s.chartButton}>
                                        <i className={cx(
                                            "glyphicon glyphicon-download",
                                            s.alignIcons
                                        )} />
                                    </button>
                                </div>
                            </>
                            : null}
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
        mapData: state.map.mapData
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