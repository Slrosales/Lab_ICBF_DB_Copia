function mostrarPadresSinHijos() {
    fetch('/padres-sin-hijos')
        .then((response) => response.json())
        .then((data) => {
            let resultadoDiv = document.getElementById('resultadoConsulta2Body')
            resultadoDiv.innerHTML = ''
            data.forEach((padre) => {
                resultadoDiv.innerHTML += `<tr>
					<td>${padre.id}</td>
					<td>${padre.nom}</td>
				</tr>`
            })
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}

mostrarPadresSinHijos()
