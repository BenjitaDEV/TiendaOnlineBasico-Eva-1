document.addEventListener('DOMContentLoaded', () => {

    // 1. ESCUCHAR EL CLIC EN CUALQUIER TARJETA DE PRODUCTO
    const tarjetas = document.querySelectorAll('.tarjeta-producto');

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('click', (e) => {
            // Si hace clic en el botón "Agregar al Carrito", no redirige
            if (e.target.classList.contains('btn-comprar')) {
                return;
            }

            const imgPrincipal = tarjeta.dataset.imagen || tarjeta.querySelector('img')?.src;

            const viniloSeleccionado = {
                titulo: tarjeta.dataset.titulo || tarjeta.querySelector('h3')?.textContent,
                categoria: tarjeta.dataset.categoria || tarjeta.querySelector('.categoria-tag')?.textContent,
                precio: tarjeta.dataset.precio || tarjeta.querySelector('.precio')?.textContent,
                imagen: imgPrincipal,
                // CAPTURAMOS DATA-IMAGEN2 Y DATA-IMAGEN3 (o respaldamos con la principal)
                imagen2: tarjeta.dataset.imagen2 || imgPrincipal,
                imagen3: tarjeta.dataset.imagen3 || imgPrincipal,
                descripcion: tarjeta.dataset.descripcion || 'Sinopsis no disponible para este vinilo por el momento.'
            };

            // Guarda el objeto en localStorage
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

            // Imagen Principal
            const imgElem = document.getElementById('detalleImagen');
            if (imgElem) {
                imgElem.src = vinilo.imagen;
                imgElem.alt = `Vinilo ${vinilo.titulo}`;
            }

            // CARGAR LAS TRES MINIATURAS
            const thumb1 = document.getElementById('thumb1');
            const thumb2 = document.getElementById('thumb2');
            const thumb3 = document.getElementById('thumb3');

            if (thumb1) thumb1.src = vinilo.imagen;
            if (thumb2) thumb2.src = vinilo.imagen2;
            if (thumb3) thumb3.src = vinilo.imagen3;

            // INTERACTIVIDAD: Al hacer clic en una miniatura, cambia la imagen grande
            const miniaturas = document.querySelectorAll('.miniatura');
            miniaturas.forEach(miniatura => {
                miniatura.addEventListener('click', function() {
                    miniaturas.forEach(m => m.classList.remove('activa'));
                    this.classList.add('activa');
                    if (imgElem) imgElem.src = this.src;
                });
            });

            // Botón Agregar al Carrito
            const btnAgregarDetalle = document.getElementById('btnDetalleAgregar');
            if (btnAgregarDetalle) {
                btnAgregarDetalle.addEventListener('click', () => {
                    alert(`¡${vinilo.titulo} fue agregado al carrito!`);
                });
            }
        }
    }
});