const count = (original, strings) => {
  let substrings = strings.split("\n");
  let occurrences = 0;
  substrings.forEach((substring) => {
    if (substring.includes(original)) {
      occurrences++;
    }
  });
  return occurrences;
};

const main = () => {
  let original = document.getElementById("original").value;
  let strings = document.getElementById("strings").value;
  let result = document.getElementById("result");
  return (result.innerHTML = `Количество строк, содержащих искомую строку: ${count(
    original,
    strings
  )}`);
};

document.getElementById("submit").addEventListener("click", main);
