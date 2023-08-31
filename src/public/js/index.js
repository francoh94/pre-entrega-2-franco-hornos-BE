const socketClient = io();

socketClient.on('todoslosproductos',(productos)=>{
    const todoslosproductos = productos.map(objproductos=>{
        console.log(todoslosproductos);
        return `
        <div>
        <p>${objproductos.producto}</p>
        <button class="agregar-btn" data-producto="${objproductos.producto}">Agregar al carrito</button>
        </div>
        `;
    }).join('');
    divproductos.innerHTML = todoslosproductos;

    const agregarBtns = document.querySelectorAll('.agregar-btn');
    agregarBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const agregarAlCarrito = e.target.getAttribute('data-producto');
            socketClient.emit('agregarAlCarrito', agregarAlCarrito);
        });
    });
})