let cash = _cashier(db_cash);
let products= _products(db_productos);
let purchase = _purchase(db_purchase);
let sales = _sales(db_sales);
let edit= _edit(db_productos);
let delet= _delete(db_productos, db_delete);
let validarE= _vErrores();



const deleteProductAction= (product, reason) =>{
    try{
        delet.new(product,reason);
        delet.del(product.id);

  
         
               
    }
    catch(err){
        document.getElementById("topAlert").innerHTML=err.error;
        $('#alertas').show()

    }

    buidTable();
    buiddeleteTable();
    getCash();
    cancelOP();
}

const deleteButtonEvent= (id)=>{
    $('#alertas1').hide()
    $('#alertas').hide()
        let container = document.getElementById("deleteContainer");
    let product = products.getProducts(id);
    container.innerHTML=` 
	<div class="container"> 
		<h1>Eliminar</h1>
	 </div> 

	<div class="col"> 
		<h5> ${product.name} </h5>
	 </div>

	 <div class="col"> 
		<h5> Existencia actual ${product.stored} </h5>
	 </div>

     <div class="col"> 
     <h5> Precio Actual ${product.price} </h5>
     </div>

	 <div class="col"> 
		<label>Escriba motivo de borrado </label>
		<input type="text" class="form-control" id="deleteProduct">
		<br>
		<button type="button" class="btn btn-danger" id="btnDeleteItem"> Eliminar producto </button>
		<button type="button" class="btn btn-primary" id="cancelDeleteItem">Cancelar</button>
	 </div>

	 `;

document.getElementById("btnDeleteItem").addEventListener("click", (e)=> {
    const reason = document.getElementById("deleteProduct").value;
    console.log(reason);
    console.log(product);
    deleteProductAction(product, reason);

});
document.getElementById("cancelDeleteItem").addEventListener("click", cancelOP);

};



const editProductAction= (product, Newprice) =>{
    try{
        edit.new(product,Newprice);
    }
    catch(err){
        document.getElementById("topAlert").innerHTML=err.error;
        $('#alertas').show()
    }
    buidTable();
    getCash();
    cancelOP();
}

const editButtonEvent= (id)=>{
    $('#alertas1').hide()
    $('#alertas').hide()
    let container = document.getElementById("editContainer");
    let product = products.getProducts(id);
    container.innerHTML=` 
	<div class="container"> 
		<h1>Editar</h1>
	 </div> 

	<div class="col"> 
		<h5> ${product.name} </h5>
	 </div>

	 <div class="col"> 
		<h5> Precio Actual= ${product.price} </h5>
	 </div>

	 <div class="col"> 
		<label>Nuevo Precio </label>
		<input type="text" class="form-control" id="editPrice">
		<br>
		<button type="button" class="btn btn-warning" id="btnEditItem"> Guardar Nuevo Precio</button>
		<button type="button" class="btn btn-danger" id="cancelEditItem">Cancelar</button>
	 </div>

	 `;

document.getElementById("btnEditItem").addEventListener("click", (e)=> {
    const newPrice= document.getElementById("editPrice").value;
    editProductAction(product.id, new Number(newPrice));

});
document.getElementById("cancelEditItem").addEventListener("click", cancelOP);

};



const buidPurchaseTable = () =>{
    let table = document.getElementById("purchaseTable");
    let lista = table.getElementsByTagName("tbody")[0];
    lista.innerHTML ="";  
    purchase.getAllPurchase().forEach((element) => {
        let row = document.createElement("tr");
        let date= moment(element.date);
        row.innerHTML=` 
        <th scope="row">${element.product}</th>
        <td>${date.format('LLLL')}</td>
        <td>${element.quantity}</td>
        <td>${element.price}</td>
        <td>${element.totalPrice}</td>
    `;
    lista.appendChild(row);
    })
}


const buiddeleteTable = () =>{

    let table = document.getElementById("deleteTable");
    let lista = table.getElementsByTagName("tbody")[0];
    lista.innerHTML ="";  
    /* here*/
    delet.getAllDeletes().forEach((element) => {
        let row = document.createElement("tr");
        let date= moment(element.date);
        row.innerHTML=` 
        <th scope="row">${element.id}</th>
        <td>${element.name}</td>
        <td>${date.format('LLLL')}</td>
        <td>${element.stored}</td>
        <td>${element.price}</td>
        <td>${element.reason}</td>
    `;
    lista.appendChild(row);
    })
}


const buidsaleTable = () =>{
    let table = document.getElementById("salesTable");
    let lista = table.getElementsByTagName("tbody")[0];
    lista.innerHTML ="";  
    sales.getAllSales().forEach((element) => {
        let row = document.createElement("tr");
        let date= moment(element.date);
        row.innerHTML=` 
        <th scope="row">${element.product}</th>
        <td>${date.format('LLLL')}</td>
        <td>${element.quantity}</td>
        <td>${element.totalPrice}</td>
    `;
    lista.appendChild(row);
    })
}


const getCash = () =>{
    let cashText = document.getElementById("cash");
    cashText.innerHTML = `Capital $ ${cash.getStored()} MXM`;

}

const buidTable= () => {
   let table = document.getElementById("productTable");
   let lista = table.getElementsByTagName("tbody")[0];
   lista.innerHTML ="";
   products.getAllProducts().forEach((elemento) => {
        let row = document.createElement("tr");
        const sellButton = `sale-${elemento.id}`;
        const purchaseButton = `purchase-${elemento.id}`;
        const editButton=  `edit-${elemento.id}`;
        const deleteButton= `delete-${elemento.id}`;
        row.innerHTML = `
            <td> <button type="button" class="btn btn-danger" id="${deleteButton}"> eliminar </buttton> </td>  
            <td> <button type="button" class="btn btn-warning" id="${editButton}">Editar</buttton> </td>  
            <th scope="row">${elemento.id}</th>           
            <td>${elemento.name}</td>
            <td>${elemento.stored}</td>
            <td>${elemento.price}</td>

            <td> <button type="button" class="btn btn-primary" id="${sellButton}"> vender </buttton> </td>
            <td> <button type="button" class="btn btn-secondary" id="${purchaseButton}"> Comprar </buttton> </td>   
 
            <td></td>
            `;
        lista.appendChild(row);               
        document.getElementById(sellButton).addEventListener('click', (e) => {
            sellButtonEvent(elemento.id);

        })
        document.getElementById(purchaseButton).addEventListener('click', (e)=>{
            purchaseButtonEvent(elemento.id);

        })

        document.getElementById(editButton).addEventListener('click', (e)=>{
            editButtonEvent(elemento.id);

        })

        document.getElementById(deleteButton).addEventListener('click', (e)=>{
            deleteButtonEvent(elemento.id);

        })
        
        
        });


    };

const sellButtonEvent =(id) =>{
         $('#alertas1').hide()
        $('#alertas').hide()
        let container = document.getElementById("sellContainer");
        let product = products.getProducts(id);
        container.innerHTML =`<div class="container"> 
        <h1> Venta </h1>
      </div>
      
      <div class="col"> 
        <h5> ${product.name} </h5>
      </div>
      
      <div class="col"> 
        <h5> Existencias ${product.stored} </h5>
      </div>
      
      <div class="col"> 
        <h5>Cantidad a vender (kg) </h5>
        <input type="text" class="form-control" id="sellItem">		
      
        <br>
        <button type="button" class="btn btn-success" id="btnSellItem">Vender</button>	
        <button type="button" class="btn btn-danger" id="cancelSell">Cancelar</button>
      </div> `
      ;
      document.getElementById("btnSellItem").addEventListener("click", (e) => {
      const amount =document.getElementById("sellItem").value;
      sellProductAction(product,new Number(amount));
      })
      document.getElementById("cancelSell").addEventListener("click", cancelOP);
      
      
      }
    
const sellProductAction =(product, amount)=>{
    try {
        const totalSale =amount*product.price;
        if(totalSale<=0 || isNaN(totalSale)){
            cash.sale(totalSale);              
        }
        else{
            products.sale(product.id, amount);
            cash.sale(totalSale);            
        }
        sales.new(product.id, amount , product.price);

    }
    catch(err){
        document.getElementById("topAlert").innerHTML=err.error;
        $('#alertas').show()
    }
    buidTable();
    getCash();
    buidsaleTable();
    cancelOP();

}


const purchaseButtonEvent= (id)=>{
    $('#alertas1').hide()
    $('#alertas').hide()
    let container = document.getElementById("purchaseContainer");
    let product = products.getProducts(id);
    container.innerHTML=` 
	<div class="container"> 
		<h1> Compras </h1>
	 </div> 

	<div class="col"> 
		<h5> ${product.name} </h5>
	 </div>

	 <div class="col"> 
		<h5> Existencias ${product.stored} </h5>
	 </div>

	 <div class="col"> 
		<label>Cantidad a comprar (kg) </label>
		<input type="text" class="form-control" id="purchaseItem">

		<label>Precio de compra (kg) </label>
		<input type="text" class="form-control" id="purchasePrice">
		<br>
		<button type="button" class="btn btn-success" id="btnPurchaseItem">Comprar</button>
		<button type="button" class="btn btn-danger" id="cancelPurchase">Cancelar</button>
	 </div>

	 `;

document.getElementById("btnPurchaseItem").addEventListener("click", (e)=> {
    const amount= document.getElementById("purchaseItem").value;
    const price = document.getElementById("purchasePrice").value;
    purchaseProductAction(product, new Number(amount), new Number(price));

});
document.getElementById("cancelPurchase").addEventListener("click", cancelOP);

};

const purchaseProductAction= (product, amount, price) =>{
    try{
        const total =price*amount;
        cash.purchase(total);
        purchase.new(product.id, amount, price);
        products.purchase(product.id, amount);


    }
    catch(err){
        document.getElementById("topAlert").innerHTML=err.error;
        $('#alertas').show()
    }
    buidTable();
    getCash();
    buidPurchaseTable();
    cancelOP();
}

const cancelOP = () =>{
    document.getElementById("sellContainer").innerHTML="";
    document.getElementById("purchaseContainer").innerHTML="";
    document.getElementById("editContainer").innerHTML="";
    document.getElementById("deleteContainer").innerHTML="";

}

const newProductEvent =() =>{
    $('#alertas1').hide()
    $('#alertas').hide()
 const name = document.getElementById('np_name').value;
 const stored=new Number(document.getElementById('np_stored').value);
 const purchasePrice=new Number(document.getElementById('np_p_price').value);
 const salePrice=new Number(document.getElementById('np_s_price').value);

 try{       
        validarE.val(name, stored, purchasePrice, salePrice);
        cash.purchase(stored*purchasePrice);
        const newProd =products.newProduct(name,stored, salePrice);
        purchase.new(newProd.id, stored, purchasePrice);
        addProductEventEnd();
       
        }
        catch(err){
            document.getElementById("lowAlert").innerHTML=err.error;
            $('#alertas1').show()
        }
        buidTable();
        getCash();      
        buidPurchaseTable();

}

const submitEvent = (e) =>{
    e.preventDefault();
    switch(e.target.id){
        case 'addProduct':
             newProductEvent();
             break;
             default:
             break;


    }


}
const addProductEventStar =() =>{
    $('#alertas1').hide()
    $('#alertas').hide()
    document.getElementById('addProduct').style.display="block";
    document.getElementById('addProductBtn').style.display="none";

}

const addProductEventEnd =() =>{
    document.getElementById('addProduct').reset();
    document.getElementById('addProduct').style.display="none";
    document.getElementById('addProductBtn').style.display="block";

}

addEventListener('load', getCash);
addEventListener('load', buidTable);
addEventListener('load', buidsaleTable);
addEventListener('load', buidPurchaseTable);
addEventListener('load', buiddeleteTable);
addEventListener("submit", submitEvent);
document.getElementById("addProductBtn").addEventListener("click", addProductEventStar);
document.getElementById("cancelNewProd").addEventListener("click", addProductEventEnd);
