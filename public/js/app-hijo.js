function insertarHijo() {
    const id = document.getElementById('hijo-id').value
    const nombre = document.getElementById('hijo-nombre').value
    const hijode = document.getElementById('hijo-hijode').value

    fetch('/hijo/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, nom: nombre, hijode: hijode })
    })
        .then((response) => response.json())
        .then((data) => {
            limpiarHijo()
            mostrarHijos()
        })
        .catch((error) => {
            console.error('Error:', error)
            alert('Ocurrió un error al insertar el hijo.')
        })
}

function mostrarHijos() {
    const tabla_body = document.getElementById('tabla-hijos-body')

    fetch('/hijo/select', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            tabla_body.innerHTML = ''
            data.forEach((hijo) => {
                tabla_body.innerHTML += `<tr>
					<td>${hijo.id}</td>
					<td>${hijo.nom}</td>
					<td>${hijo.hijode}</td>
					<td>
					<div class="buttons">
						<button class="button edit" onclick="editarHijo(${hijo.id})">Editar</button>
						<button class="button delete" onclick="eliminarHijo(${hijo.id})">Eliminar</button>
					</div>
					</td>
				</tr>`
            })
        })
        .catch((error) => {
            console.error('Error:', error)
            alert('Ocurrió un error al mostrar los hijos.')
        })
}

function editarHijo(id) {
    fetch(`/hijo/select/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            let hijo = data.find((hijo) => hijo.id == id)

            llenarFormulario(hijo)
        })
        .catch((error) => {
            console.error('Error:', error)
            alert('Ocurrió un error al mostrar el hijo.')
        })
}

function actualizarHijo() {
    const id = document.getElementById('hijo-id').value
    const nombre = document.getElementById('hijo-nombre').value
    const hijode = document.getElementById('hijo-hijode').value

    fetch('/hijo/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, nom: nombre, hijode: hijode })
    })
        .then((response) => response.json())
        .then((data) => {
            alert(`	${data.message}`)
            limpiarHijo()
            mostrarHijos()
        })
        .catch((error) => {
            console.error('Error:', error)
            alert('Ocurrió un error al actualizar el hijo.')
        })
}

function llenarFormulario(hijo) {
    document.getElementById('hijo-id').value = hijo.id
    document.getElementById('hijo-nombre').value = hijo.nom
    document.getElementById('hijo-hijode').value = hijo.hijode
}

function eliminarHijo(id) {
    if (confirm(`¿Está seguro de eliminar el hijo ${id}?`)) {
        if (!id) {
            id = document.getElementById('hijo-id').value
        }

        fetch('/hijo/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                alert(data.message)
                limpiarHijo()
                mostrarHijos()
            })
            .catch((error) => {
                console.error('Error:', error)
                alert('Ocurrió un error al eliminar el hijo.')
            })
    }
}

function limpiarHijo() {
    document.getElementById('hijo-id').value = ''
    document.getElementById('hijo-nombre').value = ''
    document.getElementById('hijo-hijode').value = ''
}

mostrarHijos()
