// display cart table
{
  /* <tr>
      <td>
        <strong class="book-title">Don&#8217;t Make Me Think</strong>  
        <span class="text-offset">by Steve Krug</span>
      </td>
      <td class="item-qty">1</td>
      <td class="item-price">$30.02</td>
    </tr> */
}

//     <tfoot>
//     <tr class="text-offset">
//       <td colspan="3">SubTotal</td>
//       <td>135.36</td>
//     </tr>
//     <tr class="text-offset">
//       <td colspan="3">Tax</td>
//       <td>13.54</td>
//     </tr>
//     <tr class="text-offset">
//       <td colspan="3">Total</td>
//       <td>148.90</td>
//     </tr>
//   </tfoot>

function displayCartTable() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const cartTableBody = document.querySelector("#tbody");
  cartTableBody.innerHTML = "";
  if (cart) {
    cart.forEach((element) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td>
            <strong class="book-title">${element.name}</strong>
            </td>
            <td class="item-stock">In Stock</td>    
            <td class="item-qty">${element.quantity}</td>
            <td class="item-price">${element.price}</td>
            `;
      cartTableBody.appendChild(tr);
    });
  }
  const cartTableFoot = document.querySelector("#tfoot");
    cartTableFoot.innerHTML = "";
    const tr1 = document.createElement("tr");
    tr1.innerHTML = `
            <td colspan="3">SubTotal</td>
            <td>₹${cart.reduce((acc, element) => acc + parseFloat(element.price.slice(1)) * element.quantity, 0.0).toFixed(2)}</td>
            `;
    cartTableFoot.appendChild(tr1);
    const tr2 = document.createElement("tr");
    tr2.innerHTML = `
            <td colspan="3">Tax</td>
            <td>₹${(cart.reduce((acc, element) => acc + parseFloat(element.price.slice(1)) * element.quantity, 0) * 0.1).toFixed(2)}</td>
            `;
    cartTableFoot.appendChild(tr2);
    const tr3 = document.createElement("tr");
    tr3.innerHTML = `
            <td colspan="3">Total</td>
            <td>₹${(cart.reduce((acc, element) => acc + parseFloat(element.price.slice(1)) * element.quantity, 0) * 1.1).toFixed(2)}</td>
            `;
    cartTableFoot.appendChild(tr3);
}

displayCartTable();
