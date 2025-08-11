async function cargarGeoPesos() {
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTctPK3hWLNDSIp-4EmEgWELkzlSBysObsGsTAWBwhH-uBSL__CgQrzv2gLRcdRfkPSQmrbaLlQRRWP/pub?gid=0&single=true&output=csv";
    
    const respuesta = await fetch(url);
    const texto = await respuesta.text();
    
    const lineas = texto.trim().split('\n');
    const tabla = document.querySelector("#geoTable tbody");
    
    tabla.innerHTML = ""; // Limpia antes de volver a cargar

    for (let i = 1; i < lineas.length; i++) {
        const fila = lineas[i].split(",");
        const tr = document.createElement("tr");

        // Nombre del estudiante
        const tdNombre = document.createElement("td");
        tdNombre.textContent = fila[0];
        tr.appendChild(tdNombre);

        // GeoPesos con formato y emoji moneda
        const tdGeoPesos = document.createElement("td");
        let valor = parseFloat(fila[1].replace(",", "."));
        if (isNaN(valor)) valor = 0;
        tdGeoPesos.textContent = valor.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " 💰";
        tr.appendChild(tdGeoPesos);

        tabla.appendChild(tr);
    }

    // Mostrar la fecha y hora de última actualización
    const ahora = new Date();
    const fechaFormateada = ahora.toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });
    document.getElementById("ultimaActualizacion").textContent = `Última actualización: ${fechaFormateada}`;
}

// Carga inicial y refresca cada 5 minutos
cargarGeoPesos();
setInterval(cargarGeoPesos, 5 * 60 * 1000);

