let selectedGender = null;

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".gender-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".gender-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedGender = btn.getAttribute("data-gender");
    });
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

  const tdee = bmr * 1.2;
  const proteinNeed = weight * conditionFactor;

  const result = `
    <p><strong>BMI:</strong> ${bmi.toFixed(1)}</p>
    <p><strong>推定エネルギー必要量（TDEE）:</strong> ${Math.round(tdee)} kcal/日</p>
    <p><strong>必要タンパク量:</strong> ${proteinNeed.toFixed(1)} g/日</p>
  `;

  document.getElementById("result").innerHTML = result;
}







function calculateInfusion() {
  const formula = document.getElementById("formula").value;
  const rate = parseFloat(document.getElementById("rate").value);
  const hoursPerDay = 24;
  const totalVolume = rate * hoursPerDay;

  const formulas = {
    enevo: {
      name: "エネーボ",
      kcalPerMl: 1.2,
      proteinPerMl: 0.045  // 1000mLで45g → 0.045g/mL
    },
    elneopa: {
      name: "エルネオパ",
      kcalPerMl: 1.0,
      proteinPerMl: 0.04   // 1000mLで40g
    },
    impact: {
      name: "インパクト",
      kcalPerMl: 1.5,
      proteinPerMl: 0.065  // 1000mLで65g
    }
  };

  const selected = formulas[formula];
  const kcal = selected.kcalPerMl * totalVolume;
  const protein = selected.proteinPerMl * totalVolume;

  const result = `
    <p><strong>${selected.name}</strong> を ${rate} mL/h × 24時間 投与</p>
    <p><strong>総投与量:</strong> ${totalVolume} mL/日</p>
    <p><strong>総カロリー:</strong> ${Math.round(kcal)} kcal/日</p>
    <p><strong>総たんぱく質:</strong> ${protein.toFixed(1)} g/日</p>
  `;

  document.getElementById("infusionResult").innerHTML = result;
}
