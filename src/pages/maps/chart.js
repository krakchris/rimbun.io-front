import React from 'react';
import Plot from 'react-plotly.js';
import s from './chart.module.scss';
import { toast } from "react-toastify";

class Chart extends React.PureComponent {

    roundUp = (num, precision) => {
        precision = Math.pow(10, precision)
        return Math.ceil(num * precision) / precision
    }

    sumArrays = (reqArrays) => {
        let finalArray = reqArrays[0];
        for (var i = 1; i < reqArrays.length; i++) {
            finalArray = finalArray.map(function (num, idx) {
                return num + reqArrays[i][idx];
            });
        }
        return finalArray;
    }

    averageParcelPointsCalculate = (parcel) => {
        let averageParcelPoints = parcel[0];
        for (var i = 0; i < parcel.length; i++) {
            Object.keys(averageParcelPoints).map((key, value) => {
                if (i > 0) averageParcelPoints[key] =
                    averageParcelPoints[key] + parcel[i][key];
                if (i === parcel.length - 1)
                    averageParcelPoints[key] = averageParcelPoints[key] / parcel.length;
            });
        };
        return averageParcelPoints;
    }

    render() {
        let green_area = [];
        let totalGreenAreaPoints = []; let averageParcelPoints = [];
        let time = []; let parcel = []; let parcel_area_data = [];
        let green_area_data = [];

        //extract required dataset information from kepler state
        for (let item of this.props.data) {
            if (item.data !== undefined) {
                time.push(eval(item.data[6])); // Time Stamp
                green_area.push(eval(item.data[8])) // Green Area Distribution
                parcel.push(JSON.parse(item.data[10])); // Parcel Area Overlap
            }
            else {
                toast.error("Invalid Datasets for Charts Represntation!", {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            }
        };

        if (green_area.length && parcel.length && time.length) {

            // Add Green area points of selected area
            totalGreenAreaPoints = this.sumArrays(green_area);

            //Plot Grea Area Distribution
            green_area_data = [{
                x: time[0],
                y: totalGreenAreaPoints,
                "mode": "lines",
                "type": "scattergl",
            }];


            //Calculate Average of the parcel overlap values of selected Points
            averageParcelPoints = this.averageParcelPointsCalculate(parcel);


            //Plot Parcel area
            parcel_area_data = [{
                x: Object.keys(averageParcelPoints),
                y: Object.values(averageParcelPoints),
                mode: "lines",
                type: "bar"
            }];


        } 
        
        const green_area_layout = {
            autosize: true,
            hovermode: 'closest',
            margin: {
                l: 25,
                r: 10,
                b: 20,
                t: 20,
            },
            title: ' Visualization green area change',
            font: {
                family: "monospace",
                size: 7,
                color: "#7f7f7f"
            },
            showlegend: false,
            xaxis: {
                'title': 'time',
                'showticklabels': false,
                'ticks': 'outside',
                autorange: "true"
            },
            yaxis: {
                autorange: "true",
                title: 'green area'
            },
        };

        const parcel_area_layout = {
            autosize: true,
            hovermode: 'closest',
            margin: {
                l: 25,
                r: 10,
                b: 20,
                t: 20,
            },
            title: ' Visualization Partial overlap',
            font: {
                family: "monospace",
                size: 7,
                color: "#7f7f7f",
            },
            showlegend: false,
            xaxis: {
                'title': 'Area',
                'showticklabels': false,
                'ticks': 'outside'
            },
            yaxis: {
                autorange: "true",
                title: 'water area',
            },
        };

        const config = {
            displaylogo: false,
        }
        return (
            <React.Fragment>
                <div className={s.chartMargin}>
                    <Plot
                        useResizeHandler
                        className={s.chartResize}
                        data={green_area_data}
                        layout={green_area_layout}
                        config={config}
                    />
                </div>

                <div className={s.chartMargin}>
                    <Plot
                        useResizeHandler
                        className={s.chartResize}
                        data={parcel_area_data}
                        layout={parcel_area_layout}
                        config={config}
                    />
                </div>
            </React.Fragment>
        );
    }
}



export default Chart;