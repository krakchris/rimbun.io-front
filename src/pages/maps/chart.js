import React from 'react';
import Plot from 'react-plotly.js';

class Chart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        let green_area_data = this.props.data.map((item, index) => {
            return {
                index: index,
                x: eval(item.data[6]),
                y: eval(item.data[8]),
                "mode": "lines",
                "type": "scattergl",
            }
        })

        let water_area_data = this.props.data.map((item, index) => {
            return {
                index: index,
                x: eval(item.data[6]),
                y: eval(item.data[7]),
                "mode": "lines",
                "type": "scattergl",
            }
        })

        const green_area_layout = {
            autosize: true,
            width: 220,
            height: 160,
            margin: {
                l: 25,
                r: 10,
                b: 20,
                t: 20,
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
                'title': 'time',
                'showticklabels': false,
                'type': 'category',
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
            height: 160,
            margin: {
                l: 25,
                r: 10,
                b: 20,
                t: 20,
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
                'title': 'time',
                'showticklabels': false,
                'type': 'category',
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
            <div style={{ height: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
                <div style={{ margin: '25px' }}>
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
            </div>
        )
    }
}

export default Chart;