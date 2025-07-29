/**
 * Amigo Secreto - Sorteo entre participantes
 * Desarrollado por: Santiago Aparicio
 * Descripción: Permite registrar nombres, realizar un sorteo aleatorio entre ellos
 *              y mostrar los resultados. Incluye opción de reinicio.
 */

// Lista de nombres de amigos que participarán en el sorteo
let listaAmigos = [];

// Bandera para saber si el sorteo ya se realizó
let juegoRealizado = false;

/**
 * Agrega un nuevo amigo a la lista si no está vacío ni repetido.
 * También actualiza el HTML con el nuevo participante.
 */
function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();
    const listaHtml = document.getElementById("listaAmigos");
    const mensaje = document.querySelector("h2");

    // Validación: campo vacío
    if (nombre === "") {
        mensaje.textContent = "Por favor, escribe un nombre válido.";
        return;
    }

    // Validación: nombre ya existente
    if (listaAmigos.includes(nombre)) {
        mensaje.textContent = `${nombre} ya está en la lista.`;
        input.value = "";
        return;
    }

    // Agregar nombre a la lista y al HTML
    listaAmigos.push(nombre);
    const item = document.createElement("li");
    item.textContent = nombre;
    listaHtml.appendChild(item);

    mensaje.textContent = `${nombre} fue agregado correctamente.`;
    input.value = "";
}

/**
 * Mezcla aleatoriamente los elementos de una lista (Fisher-Yates Shuffle).
 */
function mezclarLista(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    return lista;
}

/**
 * Realiza el sorteo del amigo secreto.
 * Si ya se hizo el sorteo, reinicia el juego.
 */
function sortearAmigo() {
    const boton = document.getElementById("botonSortear");
    const icono = boton.querySelector("i");
    const resultado = document.getElementById("resultado");
    const mensaje = document.querySelector("h2");

    // Validación: mínimo dos personas
    if (!juegoRealizado) {
        if (listaAmigos.length < 2) {
            mensaje.textContent = "Debe haber al menos 2 personas para sortear.";
            return;
        }

        // Clonar lista y mezclarla
        let mezclados = [...listaAmigos];
        mezclarLista(mezclados);

        // Mostrar resultado del sorteo
        resultado.innerHTML = "";
        for (let i = 0; i < mezclados.length; i++) {
            const quienDa = mezclados[i];
            const quienRecibe = mezclados[(i + 1) % mezclados.length];

            const li = document.createElement("li");
            li.innerHTML = `<strong>${quienDa}</strong> le regala a <strong>${quienRecibe}</strong>`;
            resultado.appendChild(li);
        }

        mensaje.textContent = "¡Sorteo realizado con éxito!";
        juegoRealizado = true;

        // Cambiar ícono a "Reiniciar"
        icono.className = "fas fa-rotate-right";
        boton.innerHTML = '<i class="fas fa-rotate-right fa-2x icono-separado"></i> Reiniciar juego';

    } else {
        reiniciarJuego();
    }
}

/**
 * Reinicia todos los valores y limpia la interfaz para comenzar un nuevo sorteo.
 */
function reiniciarJuego() {
    listaAmigos = [];
    juegoRealizado = false;

    document.getElementById("amigo").value = "";
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    document.querySelector("h2").textContent = "";
    document.getElementById("texto").textContent = "Digite el nombre de sus amigos";


    const boton = document.getElementById("botonSortear");
    boton.innerHTML = '<i class="fas fa-play-circle fa-2x icono-separado"></i> Sortear amigo';
}
