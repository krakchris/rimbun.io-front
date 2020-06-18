import React from 'react';
import Plot from 'react-plotly.js';
import s from './chart.module.scss';

class Chart extends React.Component {

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
                size: 7,
                color: "#7f7f7f"
            },
            showlegend: false,
            xaxis: {
                'title': 'time',
                'showticklabels': false,
                'ticks': 'outside'
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
                color: "#7f7f7f",
            },
            showlegend: false,
            xaxis: {
                'title': 'time',
                'showticklabels': false,
                'ticks': 'outside'
            },
            yaxis: {
                autorange: "true",
                title: 'water area',
            },
        };

        return (
            <div className={s.charts}>
                <div className={s.chartMargin}>
                    <Plot
                        data={green_area_data}
                        layout={green_area_layout}
                    />
                </div>

                <div className={s.chartMargin}>
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