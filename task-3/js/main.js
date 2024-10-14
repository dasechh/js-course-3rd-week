// Учтенные ошибки:
// - длина строки более 512 символов
// - отсутствие символа '@' в строке
// - несколько пробелов между '@'
// - отрицательный id датчика
// - нечисловые символы в id или температуре
// - длина показания более 5 символов (2 символа для id и 3 для температуры)
// - температура выходит за пределы допустимого диапазона (-50 до 50)

const validateReadings = (input) => {
  let errors = [];
  if (input.length > 512) {
    errors.push("Ошибка: длина строки превышает 512 символов.");
  }
  let readings = input.split("@").filter((reading) => reading.trim() !== "");
  if (readings.length === 0) {
    errors.push("Ошибка: отсутствуют показания.");
  }
  readings.forEach((reading, index) => {
    if (reading.trim() === "") {
      errors.push(
        `Ошибка: пустое показание после символа на позиции ${index + 1}.`
      );
      return;
    }
    if (reading.length > 5) {
      errors.push(
        `Ошибка: длина показания на позиции ${index + 1} превышает 5 символов.`
      );
      return;
    }
    let id = reading.slice(0, 2).trim();
    let temp = reading.slice(2).trim();
    if (isNaN(id) || parseInt(id) < 0 || id.length !== 2) {
      errors.push(
        `Ошибка: некорректный id датчика в показании ${index + 1}: ${id}`
      );
      return;
    }
    if (isNaN(temp) || temp === "") {
      errors.push(
        `Ошибка: некорректная температура у датчика с id ${id} в показании ${
          index + 1
        }.`
      );
      return;
    }
    temp = parseInt(temp);
    if (temp < -50 || temp > 50) {
      errors.push(
        `Ошибка: температура у датчика с id ${id} в показании ${
          index + 1
        } выходит за пределы диапазона (-50 до 50).`
      );
      return;
    }
  });
  return { readings, errors };
};

const calculateAverageTemperature = (input) => {
  const { readings, errors } = validateReadings(input);
  if (errors.length > 0) {
    return { sensorAverages: [], errors };
  }
  let sensorData = {};
  readings.forEach((reading) => {
    let id = reading.slice(0, 2).trim();
    let temp = parseInt(reading.slice(2).trim());
    if (sensorData[id]) {
      sensorData[id].temperatures.push(temp);
    } else {
      sensorData[id] = { temperatures: [temp] };
    }
  });
  let sensorAverages = Object.keys(sensorData).map((id) => {
    let temps = sensorData[id].temperatures;
    let averageTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(
      1
    );
    return { id: id, averageTemp: parseFloat(averageTemp) };
  });
  return { sensorAverages, errors };
};

const sort = (input, sortType) => {
  let { sensorAverages, errors } = calculateAverageTemperature(input);
  if (sortType === "ascendingById") {
    sensorAverages.sort((a, b) => a.id.localeCompare(b.id));
  } else if (sortType === "ascendingByAverageTemp") {
    sensorAverages.sort((a, b) => a.averageTemp - b.averageTemp);
  }
  let result = sensorAverages
    .map(
      (sensor) =>
        `${sensor.id.padStart(3, " ")} ${sensor.averageTemp
          .toFixed(1)
          .padStart(6, " ")}`
    )
    .join("<br>");
  if (errors.length > 0) {
    result += `<br><br>Ошибки:<br>${errors.join("<br>")}`;
  }
  return result;
};

const main = () => {
  let text = document.getElementById("text").value;
  let sortType = document.getElementById("sortType").value;
  let result = document.getElementById("result");
  let sorted = sort(text, sortType);
  result.innerHTML = `<pre>${sorted}</pre>`;
};

document.getElementById("button").addEventListener("click", main);
