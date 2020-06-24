import React from 'react';
import Plot from 'react-plotly.js';
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

roundUp = (num, precision) => {
    precision = Math.pow(10, precision)
    return Math.ceil(num * precision) / precision
}



 sumArrays = (reqArrays) => {
     let finalArray = reqArrays[0];
     for (var i = 1; i < reqArrays.length; i++) {
       finalArray = finalArray.map(function(num, idx) {
           return num + reqArrays[i][idx];
       });
     }
     return finalArray;
}

    render() {
        let green_area = [];
        let time = [];
        let lat = [];
        let long = [];
        let parcel= [];
        
        this.props.data.map((item, index) => {
            time.push(eval(item.data[6]));
            green_area.push(eval(item.data[8]))
            lat.push(eval(item.data[0]));
            long.push(eval(item.data[1]));
            parcel.push(item.data[10]);
        });

    
        let sumPoints = []

        sumPoints = this.sumArrays(green_area);

       

        let green_area_data = [{
            x: time[0],
            y: sumPoints,
            "mode": "lines",
            "type": "scattergl",
        }];


        let parcelX = [];
        let parcelY = [];
        let parcelTemp = {};
        parcelTemp = JSON.parse(parcel[0]);
        parcelX = Object.keys(parcelTemp);
        parcelY = Object.values(parcelTemp);

    
        let water_area_data = [{
            x: parcelX,
            y: parcelY,
              mode: "lines",
              type: "bar"
            }];



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
            displaylogo: false
        }
        return (
            <React.Fragment>
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
            </React.Fragment>
        )
    }
}



export default Chart;