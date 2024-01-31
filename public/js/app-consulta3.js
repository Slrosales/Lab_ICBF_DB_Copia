function mostrarHijosSinPadre() {
    fetch('/hijos-sin-padre')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let resultadoDiv = document.getElementById('resultadoConsulta3Body')
            resultadoDiv.innerHTML = ''
            data.forEach((hijo) => {
                resultadoDiv.innerHTML += `<tr>
					<td>${hijo.id}</td>
					<td>${hijo.nom}</td>
				</tr>`
            })
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}

mostrarHijosSinPadre()
