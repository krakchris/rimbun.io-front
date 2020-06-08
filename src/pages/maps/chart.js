import React from 'react';
import Plot from 'react-plotly.js';
// import { Bar, Scatter, Line } from 'react-chartjs-2';


class Chart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log('data', this.props.data);

        /* code for coordinates plotting */
        // let cooordData = this.props.coord.map((item, index) => {
        //     return item.geometry.coordinates
        // })
        // let tempCoord = cooordData.flat(Infinity);
        // console.log('coordData', tempCoord)

        // let xcoord = tempCoord.filter((item, index) => {
        //     return (index % 2 === 0) ? item : null
        // })

        // let ycoord = tempCoord.filter((item, index) => {
        //     return (index % 2 !== 0) ? item : null;
        // })

        // console.log('x', xcoord)
        // console.log('y', ycoord)

        let green_area_data = this.props.data.map((item, index) => {
            return {
                index: index,
                x: eval(item.data[6]),
                y: eval(item.data[8]),
                "mode": "lines",
                "type": "scattergl",
                //    "name": `trace${index + 1}`
            }
        })

        let water_area_data = this.props.data.map((item, index) => {
            return {
                index: index,
                x: eval(item.data[6]),
                y: eval(item.data[7]),
                "mode": "lines",
                "type": "scattergl",
                // "name": `trace${index + 1}`
            }
        })

        const green_area_layout = {
            autosize: true,
            width: 220,
            height: 180,
            margin: {
                l: 25,
                r: 10,
                b: 50,
                t: 50,
                pad: 2
            },
            title: ' Visualization green area change',
            font: {
                family: "monospace",
                size: 8,
                color: "#7f7f7f"
            },
            showlegend: false,
            xaxis: {
                'type': 'category',
                'title': 'time',
                'tickangle': 60,
                'showspikes': true,
                'spikethickness': 2,
                'spikemode': "toaxis+across+marker",
                'ticks': 'outside',
                'showgrid': true,
                'tickfont': {
                    'family': 'Balto',
                    'size': 6,
                }
            },
            yaxis: {
                autorange: "true",
                title: 'green area'
            },
        };

        const water_area_layout = {
            autosize: true,
            width: 220,
            height: 180,
            margin: {
                l: 25,
                r: 10,
                b: 50,
                t: 50,
                pad: 2
            },
            title: ' Visualization water area over time',
            font: {
                family: "monospace",
                size: 7,
                color: "#7f7f7f"
            },
            showlegend: false,
            xaxis: {
                'type': 'category',
                'title': 'time',
                'tickangle': 60,
                'showspikes': true,
                'spikethickness': 2,
                'spikemode': "toaxis+across+marker",
                'ticks': 'outside',
                'showgrid': true,
                'tickfont': {
                    'family': 'Balto',
                    'size': 6,
                }
            },
            yaxis: {
                autorange: "true",
                title: 'water area',
            },
        };

        return (
            <React.Fragment>
                <div style={{ margin: ' 25px' }}>
                    <Plot
                        data={green_area_data}
                        layout={green_area_layout}
                    />
                </div>

                <div style={{ margin: '25px' }}>
                    <Plot
                        data={water_area_data}
                        layout={water_area_layout}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default Chart;