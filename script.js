document.addEventListener('DOMContentLoaded', () => {

    // 1. ESCUCHAR EL CLIC EN CUALQUIER TARJETA DE PRODUCTO
    const tarjetas = document.querySelectorAll('.tarjeta-producto');

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('click', (e) => {
            // Si hace clic en el botón "Agregar al Carrito", no redirige a la página de detalle
            if (e.target.classList.contains('btn-comprar')) {
                return;
            }

            const viniloSeleccionado = {
                titulo: tarjeta.dataset.titulo || tarjeta.querySelector('h3')?.textContent,
                categoria: tarjeta.dataset.categoria || tarjeta.querySelector('.categoria-tag')?.textContent,
                precio: tarjeta.dataset.precio || tarjeta.querySelector('.precio')?.textContent,
                imagen: tarjeta.dataset.imagen || tarjeta.querySelector('img')?.src,
                descripcion: tarjeta.dataset.descripcion || 'Sinopsis no disponible para este vinilo por el momento.'
            };

            // Guarda el objeto en localStorage con la clave 'viniloSeleccionado'
            localStorage.setItem('viniloSeleccionado', JSON.stringify(viniloSeleccionado));

            // Redirige a detalleProductos.html
            window.location.href = 'detalleProductos.html';
        });
    });

    // 2. CARGAR Y MOSTRAR LOS DATOS EN detalleProductos.html
    const tituloDetalle = document.getElementById('detalleTitulo');

    if (tituloDetalle) {
        const vinilo = JSON.parse(localStorage.getItem('viniloSeleccionado'));

        if (vinilo) {
            document.getElementById('detalleTitulo').textContent = vinilo.titulo;
            document.getElementById('detalleCategoria').textContent = vinilo.categoria;
            document.getElementById('detallePrecio').textContent = vinilo.precio;
            document.getElementById('detalleDescripcion').innerHTML = vinilo.descripcion;

            const imgElem = document.getElementById('detalleImagen');
            if (imgElem) {
                imgElem.src = vinilo.imagen;
                imgElem.alt = `Vinilo ${vinilo.titulo}`;
            }

            // Evento para el botón de agregar al carrito dentro de detalleProductos.html
            const btnAgregarDetalle = document.getElementById('btnDetalleAgregar');
            if (btnAgregarDetalle) {
                btnAgregarDetalle.addEventListener('click', () => {
                    alert(`¡${vinilo.titulo} fue agregado al carrito!`);
                });
            }
        }
    }
});