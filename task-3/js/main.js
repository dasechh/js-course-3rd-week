const calculateAverageTemperature = (input) => {
    let readings = input.split('@');
    let sensorData = {};
    readings.forEach((reading) => {
        let id = reading.slice(0, 2);
        let temp = parseInt(reading.slice(2));
        if (sensorData[id]) {
            sensorData[id].temperatures.push(temp);
        } else {
            sensorData[id] = { temperatures: [temp] };
        }
    });
    let sensorAverages = Object.keys(sensorData).map((id) => {
        let temps = sensorData[id].temperatures;
        let averageTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
        return { id: id, averageTemp: parseFloat(averageTemp) };
    });

    return sensorAverages;
};

const sort = (input, sortType) => {
    let averages = calculateAverageTemperature(input);
    if (sortType === "ascendingById") {
        averages.sort((a, b) => a.id.localeCompare(b.id));
    } else if (sortType === "ascendingByAverageTemp") {
        averages.sort((a, b) => a.averageTemp - b.averageTemp);
    }
    return averages
        .map((sensor) => `${sensor.id.padStart(3, ' ')} ${sensor.averageTemp.toFixed(1).padStart(6, ' ')}`)
        .join("<br>");
};

const main = () => {
    let text = document.getElementById("text").value;
    let sortType = document.getElementById("sortType").value;
    let result = document.getElementById("result");
    let sorted = sort(text, sortType);
    result.innerHTML = `<pre>${sorted}</pre>`;
};

document.getElementById("button").addEventListener("click", main);