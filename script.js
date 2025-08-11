async function cargarGeoPesos() {
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTctPK3hWLNDSIp-4EmEgWELkzlSBysObsGsTAWBwhH-uBSL__CgQrzv2gLRcdRfkPSQmrbaLlQRRWP/pub?gid=0&single=true&output=csv";
    
    const respuesta = await fetch(url);
    const texto = await respuesta.text();
    
    const lineas = texto.trim().split('\n');
    const tbody = document.getElementById("geoTable").querySelector("tbody");
    
    tbody.innerHTML = ""; // Limpia antes de volver a cargar

    for (let i = 1; i < lineas.length; i++) {
        const fila = lineas[i].split(",");
        const tr = document.createElement("tr");
        
        fila.forEach((columna, index) => {
            const td = document.createElement("td");
            if(index === 1) { // Columna de GeoPesos
                const valorNum = Number(columna);
                if(!isNaN(valorNum)) {
                    td.textContent = valorNum.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " 💰";
                } else {
                    td.textContent = columna;
                }
            } else {
                td.textContent = columna;
            }
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    }
}

cargarGeoPesos();
setInterval(cargarGeoPesos, 5 * 60 * 1000); // Actualiza cada 5 minutos
