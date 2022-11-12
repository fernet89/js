const _cashier =(start) =>{
    let cash = start;
    return {
        sale: (total) => {
            if(total<=0){
                throw{error: "ingrese un numero mayor a 0"}  
            }
            else if(isNaN(total)){  
                throw{error: "Los valores a ingresar deben ser numericos no se acepta Texto"}   
            }
            else{

                cash+=total; }

            
        },
        purchase: (total) => {
            if(total>cash){
                throw{error: "Fondos insuficiente"} 
            }
            else if(isNaN(total)){  
                throw{error: "Los valores a ingresar deben ser numericos no se acepta Texto"}   
            }
            else if(total<0){  
                throw{error: "ingrese un numero mayor a 0"}  
            }
            else{

                cash-=total; 
            
            }
        },
        getStored:() => {
            return cash;
        }
    }
};

const _products = (start) => {
    let products = start;
    return {
        sale: (id, amount) => {
            const index = products.findIndex((item)=> item.id == id);
           
           
           
           
           
           
           
           
            if(index> -1){
                if(products[index].stored >= amount){
                    products[index].stored -=amount;

                } else {
                    throw {error: "Poca existencia"}

                }
            } else {
                throw{error:"Producto no econtrado"}
            }

        
        
        
        },
        
        purchase: (id,amount) => {
            const index = products.findIndex((item)=> item.id === id);
            if(index >-1 ){
                products[index].stored += amount;                
            }        
             else{
                 throw{error:"Producto no econtrado"}
             }
        },
        getAllProducts: () => {
            return products;
        },

        getProducts:(id) =>{
            const index = products.findIndex((item)=> item.id === id);
            return products[index];
        },
        newProduct: (name, stored, price) => {

            const lastProduct = products[products.length -1];
            const newProd = {id:lastProduct.id +1, name: name , stored: stored, price: price, 
            };
            products.push(newProd);
            return newProd;
        },


    };

};

const _sales=(start) => {
    let sales= start; 
    return {
        new:(id, quantity, price) =>{
            sales.push({
            product:id,
            date:new Date(),
            quantity:quantity,
            totalPrice:quantity*price,

            });
        }, 
            getAllSales:() =>{
            return sales;
        },
    };
};

const _purchase =(start) => {
    let purchases= start; 
    return {
        new:(id, quantity, price) =>{
            if(price<=0){
                throw {error: "ingrese un numero mayor a 0"}
            }
            else if(isNaN(price)){
                throw {error: "Los valores a ingresar deben ser numericos no se acepta Texto"}
            }
             else {
                    purchases.push({
                    product:id,
                    date:new Date(),
                    quantity:quantity,
                    totalPrice:quantity*price,
                    price:price,    
            }); 

            } 
        }, 
        
        getAllPurchase: () => {
            return purchases;
        },
    };
};

const _edit = (start) =>{

let products = start;
return {
    new:(id, newPrice) => {
        if(newPrice<=0){
            throw {error: "ingrese un numero mayor a 0"}
        }
        else if(isNaN(newPrice)){
            throw {error: "Los valores a ingresar deben ser numericos no se acepta Texto"}
        }
         else {
         const index = products.findIndex((item)=> item.id === id);
         const editPrice = {id:products[index].id, name:products[index].name, stored: products[index].stored, price:newPrice};
         products[index]=editPrice; }


} 
}   
};

const _delete =(startp,startd) => {
    let deletes = startd; 
    let products = startp; 
    return {
        new:(producto,reason) =>{
            
            if (reason=="") {/*Dato invalido! un comentario*/
            
                            throw {error:"No ingreso el motivo por favor ingrese un comentario valido"};


            }
            else if(!isNaN(reason)){ 
                            throw {error:"El motivo no puede contener solo valores númericos por favor ingrese un comentario valido "};              
             }
            else{ 
                deletes.push({
                    id:producto.id,
                    name:producto.name,
                    date:new Date(),
                    stored:producto.stored,
                    price:producto.price,
                    reason:reason,
    
                });                                        
        }
        },

        getAllDeletes:() =>{
            return deletes;
        },
         
        
        del:(id) =>{
          
                const index = products.findIndex((item)=> item.id === id);
                products.splice(index,1);
                  
        },
    };
};

const _vErrores =() =>{

    return{
        val:(name, stored, purchasePrice, salePrice) =>{

            document.getElementById("np_name").style.borderColor = "#ced4da";
            document.getElementById("np_stored").style.borderColor = "#ced4da";
            document.getElementById("np_p_price").style.borderColor = "#ced4da";
            document.getElementById("np_s_price").style.borderColor = "#ced4da";
        
            if( name == "" || !isNaN(name) ){
                document.getElementById("np_name").style.borderColor = "#FF0000";
                throw {error:"Ingrese un nombre valido"};
               
            
                }else if(stored < 0 || isNaN(stored) ) { 
                        document.getElementById("np_name").style.borderColor = "#ced4da";
                        document.getElementById("np_stored").style.borderColor = "#FF0000";
                        throw {error:"Ingrese un número valido"};
                        
        
                    }else if(purchasePrice < 0 || isNaN(purchasePrice) ) { 
                        document.getElementById("np_stored").style.borderColor = "#ced4da";
                        document.getElementById("np_p_price").style.borderColor = "#FF0000";
                        throw {error:"Ingrese un precio valido"};
        
                        }else if(salePrice < 0 || isNaN(salePrice) ) { 
                            document.getElementById("np_name").style.borderColor = "#ced4da";
                            document.getElementById("np_stored").style.borderColor = "#ced4da";
                            document.getElementById("np_p_price").style.borderColor = "#ced4da";
                            document.getElementById("np_s_price").style.borderColor = "#FF0000";
                            throw {error:"Ingrese un precio valido"};
                            }
                            else{
                                document.getElementById("np_name").style.borderColor = "#ced4da";
                                document.getElementById("np_stored").style.borderColor = "#ced4da";
                                document.getElementById("np_p_price").style.borderColor = "#ced4da";
                                document.getElementById("np_s_price").style.borderColor = "#ced4da";

                            }


        }
    }
}