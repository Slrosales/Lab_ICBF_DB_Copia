// app-consulta1.js
function mostrarHijosPorPadre() {
    const padreId = document.getElementById('padreId').value
    // agrega el id como hash a la URL
    if (padreId) {
        window.location.hash = padreId
    } else {
        window.location.hash = ''
    }
    fetch('/hijos-por-padre/' + padreId)
        .then((response) => response.json())
        .then((data) => {
            let resultadoDiv = document.getElementById('resultadoConsulta1Body')

            mostrarInfoPadre(padreId)
            resultadoDiv.innerHTML = ''
            data.forEach((hijo) => {
                resultadoDiv.innerHTML += `<tr>
					<td>${hijo.id}</td>
					<td>${hijo.nom}</td>
					<td>${padreId}</td>
				</tr>`
            })
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}
function mostrarInfoPadre(idPadre) {
    fetch('/padre/select', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            let resultadoDiv = document.getElementById('padre_info')
            let padre = data.find((padre) => padre.id == idPadre)
            resultadoDiv.innerHTML = ''
            resultadoDiv.innerHTML += `<p>ID: ${padre.id}, Nombre: ${padre.nom}</p>`
        })
}

function mostrarHijosInicio() {
    const padreId = window.location.hash.substring(1)
    console.log(padreId)

    if (padreId) {
        console.log('mostrando hijos por padre del padre' + padreId)
        document.getElementById('padreId').value = padreId
        mostrarHijosPorPadre()
    }

    return
}

mostrarHijosInicio()
