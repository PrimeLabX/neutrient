let selectedGender = null;

document.querySelectorAll(".gender-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".gender-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedGender = btn.getAttribute("data-gender");
  });
});

function calculatePlan() {
  const age = parseInt(document.getElementById("age").value);
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const conditionFactor = parseFloat(document.getElementById("condition").value);

  if (!selectedGender) {
    alert("性別を選択してください");
    return;
  }

  const bmi = weight / ((height / 100) ** 2);
  const bmr = selectedGender === "male"
    ? 13.397 * weight + 4.799 * height - 5.677 * age + 88.362
    : 9.247 * weight + 3.098 * height - 4.330 * age + 447.593;

  const tdee = bmr * 1.2; // 安静時係数
  const proteinNeed = weight * conditionFactor;

  const result = `
    <p><strong>BMI:</strong> ${bmi.toFixed(1)}</p>
    <p><strong>推定エネルギー必要量（TDEE）:</strong> ${Math.round(tdee)} kcal/日</p>
    <p><strong>必要タンパク量:</strong> ${proteinNeed.toFixed(1)} g/日</p>
  `;

  document.getElementById("result").innerHTML = result;
}
