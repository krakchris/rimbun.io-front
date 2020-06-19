import React from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux';
import Icon from "../../components/Icon";
import s from './chart.module.scss';

class Chart extends React.Component {

    sortArrays = (arrays, comparator = (a, b) => (a < b) ? -1 : (a > b) ? 1 : 0) => {
        let arrayKeys = Object.keys(arrays);
        let sortableArray = Object.values(arrays)[0];
        let indexes = Object.keys(sortableArray);
        let sortedIndexes = indexes.sort((a, b) => comparator(sortableArray[a], sortableArray[b]));

        let sortByIndexes = (array, sortedIndexes) => sortedIndexes.map(sortedIndex => array[sortedIndex]);

        if (Array.isArray(arrays)) {
            return arrayKeys.map(arrayIndex => sortByIndexes(arrays[arrayIndex], sortedIndexes));
        } else {
            let sortedArrays = {};
            arrayKeys.forEach((arrayKey) => {
                sortedArrays[arrayKey] = sortByIndexes(arrays[arrayKey], sortedIndexes);
            });
            return sortedArrays;
        }
    }

    render() {
        let green_area = [];
        let time = [];
        this.props.data.map((item, index) => {
            time.push(eval(item.data[6]));
            green_area.push(eval(item.data[8]))
        })

        let green_data = this.sortArrays([green_area.flat(Infinity), time.flat(Infinity)])

        let green_area_data = [{
            x: green_data[1],
            y: green_data[0],
            "mode": "lines",
            "type": "scattergl",
        }];

        /* uncomment it for without merge green_area_data :)*/

        // let green_area_data = [{
        //     x: time.flat(Infinity),
        //     y: green_area.flat(Infinity),
        //     "mode": "lines",
        //     "type": "scattergl",
        // }];


        let water_area_data = this.props.data.map((item, index) => {
            return {
                index: index,
                x: eval(item.data[6]),
                y: eval(item.data[9]),
                "mode": "lines",
                "type": "bar",
            }
        })


        const green_area_layout = {
            autosize: true,
            hovermode: 'closest',
            width: 220,
            height: 140,
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
                'ticks': 'outside',
                autorange: "true"
            },
            yaxis: {
                autorange: "true",
                title: 'green area'
            },
        };

        const water_area_layout = {
            autosize: true,
            hovermode: 'closest',
            width: 220,
            height: 140,
            margin: {
                l: 25,
                r: 10,
                b: 20,
                t: 20,
                pad: 2
            },
            title: ' Visualization Partial overlap',
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

        const config = {
            displaylogo: false
        }
        return (
            <div className={s.charts}>
                <div className={s.keplerLogo}>
                    <Icon glyph="logo" />
                    <p><span>{(this.props.mapData) ? this.props.mapData.name : 'Loading....'}</span></p>
                </div>

                <div className={s.chartMargin}>
                    <Plot
                        data={green_area_data}
                        layout={green_area_layout}
                        config={config}
                    />
                </div>

                <div className={s.chartMargin}>
                    <Plot
                        data={water_area_data}
                        layout={water_area_layout}
                        config={config}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        mapData: state.map.mapData
    };
}

export default connect(mapStateToProps)(Chart);