const count = (searchString, strings) => {
  let substrings = strings.split("\n");
  let occurrences = 0;
  substrings.forEach((substring) => {
    if (substring.includes(searchString)) {
      occurrences++;
    }
  });
  return occurrences;
};

const main = () => {
  let searchString = document.getElementById("searchString").value;
  let strings = document.getElementById("strings").value;
  let result = document.getElementById("result");
  return (result.innerHTML = `Количество строк, содержащих искомую строку: ${count(
    searchString,
    strings
  )}`);
};

document.getElementById("submit").addEventListener("click", main);
