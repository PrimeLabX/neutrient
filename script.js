function calculatePlan() {
  const age = parseInt(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);

  const bmi = weight / ((height / 100) ** 2);
  const bmr = gender === "male"
    ? 13.397 * weight + 4.799 * height - 5.677 * age + 88.362
    : 9.247 * weight + 3.098 * height - 4.330 * age + 447.593;

  const tdee = bmr * 1.2; // 安静時係数

  const result = `
    <p><strong>BMI:</strong> ${bmi.toFixed(1)}</p>
    <p><strong>推定エネルギー必要量（TDEE）:</strong> ${Math.round(tdee)} kcal/日</p>
  `;
  document.getElementById("result").innerHTML = result;
}
