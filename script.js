const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTctPK3hWLNDSIp-4EmEgWELkzlSBysObsGsTAWBwhH-uBSL__CgQrzv2gLRcdRfkPSQmrbaLlQRRWP/pub?gid=0&single=true&output=csv";

async function loadData() {
  const res = await fetch(sheetURL);
  const data = await res.text();

  const rows = data.trim().split("\n").slice(1); // Ignora la cabecera
  const tableBody = document.querySelector("#geoTable tbody");

  tableBody.innerHTML = "";

  rows.forEach(row => {
    const [nombre, dinero] = row.split(",");
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${nombre}</td><td>${dinero}</td>`;
    tableBody.appendChild(tr);
  });
}

loadData();
setInterval(loadData, 2 * 60 * 60 * 1000); // Actualiza cada 2 horas
