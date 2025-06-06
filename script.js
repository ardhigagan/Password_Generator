const passwordDisplay = document.getElementById("passwordDisplay");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const strengthValue = document.getElementById("strengthValue");
const bars = document.querySelectorAll(".bars span");

lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordDisplay.value);
  copyBtn.textContent = "✅";
  setTimeout(() => (copyBtn.textContent = "📋"), 1500);
});

generateBtn.addEventListener("click", generatePassword);

function generatePassword() {
  const len = parseInt(lengthSlider.value);
  const charset = [];

  if (uppercase.checked) charset.push(..."ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  if (lowercase.checked) charset.push(..."abcdefghijklmnopqrstuvwxyz");
  if (numbers.checked) charset.push(..."0123456789");
  if (symbols.checked) charset.push(..."!@#$%^&*()_+=-");

  if (charset.length === 0) {
    passwordDisplay.value = "Please select options";
    return;
  }

  let password = "";
  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  passwordDisplay.value = password;
  setStrength(len, charset);
}

function setStrength(len, charset) {
  let strengthScore = 0;
  if (uppercase.checked) strengthScore++;
  if (lowercase.checked) strengthScore++;
  if (numbers.checked) strengthScore++;
  if (symbols.checked) strengthScore++;

  if (len >= 12 && strengthScore === 4) {
    strengthValue.textContent = "STRONG";
    updateBars(4, "lime");
  } else if (len >= 8 && strengthScore >= 2) {
    strengthValue.textContent = "MEDIUM";
    updateBars(3, "orange");
  } else {
    strengthValue.textContent = "WEAK";
    updateBars(1, "red");
  }
}

function updateBars(activeBars, color) {
  bars.forEach((bar, idx) => {
    if (idx < activeBars) {
      bar.style.background = color;
    } else {
      bar.style.background = "grey";
    }
  });
}
