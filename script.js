function calculateAll() {
  // Datos básicos
  const name = document.getElementById("name").value;
  const batch = document.getElementById("batch").value;
  const date = document.getElementById("date").value;

  // Datos técnicos
  const og = parseFloat(document.getElementById("og").value);
  const fg = parseFloat(document.getElementById("fg").value);
  const temp = parseFloat(document.getElementById("temp").value);
  const abvDesired = parseFloat(document.getElementById("abv-desired").value);

  // Cálculos
  const abv = (og - fg) * 131.25; // Fórmula 1
  const residualSugar = (fg - 0.996) * 200; // Fórmula 2
  const sugarNeeded = ((abvDesired - abv) * 17) / 0.55; // Fórmula 3
  const potentialAbv = (og - 0.996) * 131.25; // Fórmula 4
  const correctedSG = og + (0.0002 * (temp - 20)); // Fórmula 5

  // Clasificación del vino (Fórmula 6)
  let wineType = "";
  if (fg < 0.996) wineType = "Seco (< 4 g/L)";
  else if (fg >= 0.996 && fg <= 1.005) wineType = "Semiseco (4-12 g/L)";
  else wineType = "Dulce (> 12 g/L)";

  // Mostrar resultados
  document.getElementById("calculation-result").innerHTML = `
    <h3>🧪 Resultados para ${name}</h3>
    <p><strong>Lote:</strong> ${batch} | <strong>Fecha:</strong> ${date}</p>
    <hr>
    <p><strong>ABV Actual:</strong> ${abv.toFixed(2)}%</p>
    <p><strong>Azúcar Residual:</strong> ${residualSugar.toFixed(2)} g/L (${wineType})</p>
    <p><strong>Azúcar Necesaria para ${abvDesired}% ABV:</strong> ${sugarNeeded.toFixed(2)} g/L</p>
    <p><strong>ABV Potencial Inicial:</strong> ${potentialAbv.toFixed(2)}%</p>
    <p><strong>Densidad Corregida (20°C):</strong> ${correctedSG.toFixed(3)}</p>
  `;
  document.getElementById("results").style.display = "block";
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const name = document.getElementById("name").value;
  const results = document.getElementById("calculation-result").textContent;

  doc.text(`Reporte Vinícola - ${name}`, 10, 10);
  doc.text(results.split('\n').filter(line => line.trim() !== ''), 10, 20);
  doc.save(`reporte_vinicola_${name}.pdf`);
}