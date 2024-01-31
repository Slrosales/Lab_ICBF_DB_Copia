function mostrarPadresConNumeroDeHijos() {
    fetch('/padres-con-cantidad-hijos')
        .then((response) => response.json())
        .then((data) => {
            let resultadoDiv = document.getElementById('resultadoConsulta4Body')
            resultadoDiv.innerHTML = ''
            data.forEach((padre) => {
                resultadoDiv.innerHTML += `<tr>
					<td>${padre.id}</td>
					<td>${padre.nom}</td>
					<td>${padre.cantidad_hijos}</td>
				</tr>`
            })
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}

mostrarPadresConNumeroDeHijos()
