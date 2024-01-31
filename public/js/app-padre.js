mostrarPadres()

function insertarPadre() {
    const id = document.getElementById('padre-id').value
    const nombre = document.getElementById('padre-nombre').value

    fetch('/padre/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, nom: nombre })
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message)
            document.getElementById('padre-id').value = ''
            document.getElementById('padre-nombre').value = ''
        })
        .catch((error) => {
            // console.error('Error:', error.message)
            alert('Ocurrió un error al insertar el padre.')
        })
}

function llenarFormulario(padre) {
    document.getElementById('padre-id').value = padre.id
    document.getElementById('padre-nombre').value = padre.nom
}

function mostrarPadres() {
    const tabla_body = document.getElementById('tabla-padres-body')
    tabla_body.innerHTML = ''

    fetch('/padre/select', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            data.forEach((padre) => {
                tabla_body.innerHTML += `<tr>
					<td>${padre.id}</td>
					<td>${padre.nom}</td>
					<td>
					<div class="buttons">
						<button class="button edit" onclick="editarPadre(${padre.id})">Editar</button>
						<button class="button delete" onclick="eliminarPadre(${padre.id})">Eliminar</button>
						<button class="button hijos" onclick="mostrarHijos(${padre.id})">Hijos</button>
					</div>
					</td>
				</tr>`
            })
        })
}

function editarPadre(id) {
    fetch(`/padre/select`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            let padre = data.find((padre) => padre.id == id)
            llenarFormulario(padre)
            // hijosDePadre(id)
        })
        .catch((error) => {
            console.error('Error:', error)
            alert('Ocurrió un error al mostrar el padre.')
        })
}

function mostrarHijos(id_padre) {
    // redireccionar a la página de consulta 1
    window.location.href = `/consulta1#${id_padre}`
}

function actualizarPadre() {
    const id = document.getElementById('padre-id').value
    const nombre = document.getElementById('padre-nombre').value

    fetch(`/padre/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nom: nombre, id: id })
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message)
            limpiarPadre()
            mostrarPadres()
        })
        .catch((error) => {
            console.error('Error:', error)
            alert('Ocurrió un error al actualizar el padre.')
        })
}

function limpiarPadre() {
    document.getElementById('padre-id').value = ''
    document.getElementById('padre-nombre').value = ''
}

function eliminarPadre(id) {
    if (!confirm('¿Está seguro de eliminar el padre?')) {
        return
    }
    fetch(`/padre/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message)
            mostrarPadres()
            hijosDePadre(id)
        })
        .catch((error) => {
            console.error('Error:', error)
            alert('Ocurrió un error al eliminar el padre.')
        })
}

function hijosDePadre(id) {
    fetch(`/hijos-por-padre/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let hijos = []
            data.forEach((hijo) => {
                console.log(
                    `se asignara string vacio en el padre a: ${hijo.id}`
                )
                hijos.push(hijo.id)
                actualizarHijo(hijo)
            })
            alert(`Los hijos ${hijos} ya no tienen padre`)
        })
        .catch((error) => {
            console.error('Error:', error)
            alert('Ocurrió un error al mostrar los hijos.')
        })
}

function actualizarHijo(hijo) {
    const { id, nom } = hijo

    fetch('/hijo/update-padre', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hijo)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.error('Error:', error)
            alert('Ocurrió un error al actualizar el hijo.')
        })
}
