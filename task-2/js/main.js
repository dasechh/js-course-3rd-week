const main = () => {
  let text = document.getElementById("text").value;
  let characters = text.split("");
  let probabilities = getProbabilities(characters);
  return (document.getElementById(
    "result"
  ).innerHTML = `Энтропия по Шеннону: ${calculateEntropy(probabilities).toFixed(2)}`);
};

const calculateEntropy = (probabilities) => {
  let entropy = 0;
  probabilities.forEach((p) => {
    if (p > 0) {
      entropy -= p * Math.log2(p);
    }
  });
  return entropy;
};

const getProbabilities = (characters) => {
  let counts = {};
  let total = characters.length;
  characters.forEach((char) => {
    counts[char] = (counts[char] || 0) + 1;
  });
  return Object.values(counts).map((count) => count / total);
};

document.getElementById("button").addEventListener("click", main);
