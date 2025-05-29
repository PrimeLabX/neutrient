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









document.addEventListener("DOMContentLoaded", function () {
  const formulaOptions = {
    enevo: { name: "エネーボ", kcalPerMl: 1.2, proteinPerMl: 0.045 },
    elneopa: { name: "エルネオパ", kcalPerMl: 1.0, proteinPerMl: 0.04 },
    impact: { name: "インパクト", kcalPerMl: 1.5, proteinPerMl: 0.065 }
  };

  const container = document.getElementById("formulaContainer");

  for (let i = 0; i < 3; i++) {
    const group = document.createElement("div");
    group.className = "formula-group";

    const select = document.createElement("select");
    select.className = "formula";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = `-- 製剤${i + 1}を選択 --`;
    select.appendChild(defaultOption);

    for (const key in formulaOptions) {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = formulaOptions[key].name;
      select.appendChild(option);
    }

    const rateLabel = document.createElement("label");
    rateLabel.textContent = " 速度(mL/h): ";

    const rateInput = document.createElement("input");
    rateInput.type = "number";
    rateInput.className = "rate";
    rateInput.value = "0";
    rateInput.min = "0";

    rateLabel.appendChild(rateInput);

    group.appendChild(select);
    group.appendChild(rateLabel);
    container.appendChild(group);
  }
});

function calculateInfusion() {
  const formulas = {
    enevo: { name: "エネーボ", kcalPerMl: 1.2, proteinPerMl: 0.045 },
    elneopa: { name: "エルネオパ", kcalPerMl: 1.0, proteinPerMl: 0.04 },
    impact: { name: "インパクト", kcalPerMl: 1.5, proteinPerMl: 0.065 }
  };

  const formulaSelects = document.querySelectorAll(".formula");
  const rateInputs = document.querySelectorAll(".rate");

  let totalVolume = 0;
  let totalKcal = 0;
  let totalProtein = 0;
  let breakdownHTML = "";

  for (let i = 0; i < formulaSelects.length; i++) {
    const formulaKey = formulaSelects[i].value;
    const rate = parseFloat(rateInputs[i].value);

    if (!formulaKey || isNaN(rate) || rate <= 0) continue;

    const formula = formulas[formulaKey];
    const volume = rate * 24;
    const kcal = volume * formula.kcalPerMl;
    const protein = volume * formula.proteinPerMl;

    totalVolume += volume;
    totalKcal += kcal;
    totalProtein += protein;

    breakdownHTML += `
      <p><strong>${formula.name}</strong>（${rate} mL/h × 24h）</p>
      <p>→ ${volume} mL/日：${Math.round(kcal)} kcal, ${protein.toFixed(1)} g たんぱく質</p>
    `;
  }

  const totalHTML = `
    <hr>
    <p><strong>合計投与量:</strong> ${totalVolume} mL/日</p>
    <p><strong>総カロリー:</strong> ${Math.round(totalKcal)} kcal/日</p>
    <p><strong>総たんぱく質:</strong> ${totalProtein.toFixed(1)} g/日</p>
  `;

  document.getElementById("infusionResult").innerHTML =
    breakdownHTML || "<p>有効な入力がありません。</p>" + totalHTML;
}
