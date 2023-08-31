const socketClient = io();

socketClient.on("carts", (carts) => {
  const allCarts = carts
    .map((objCarts) => {
      const productItems = objCarts.products
        .map((products) => {
          return `
            <li>
              Product ID: ${products.id}
              Quantity: ${products.quantity}
            </li>
          `;
        })
        .join("");
      
      return `
        <p>
          Name: ${objCarts.name}
          Products:
          <ul>
            ${productItems}
          </ul>
          ID: ${objCarts._id}
        </p>
      `;
    })
    .join(" ");
  cartsContainer.innerHTML = allCarts;
});
