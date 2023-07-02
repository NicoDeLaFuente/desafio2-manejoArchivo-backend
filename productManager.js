const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path
    }

    //metodos addProduct, getProductById, modifyProduct, deleteProduct 

    addProduct (product) {
        const products = this.getProducts();
        const id = products.length + 1;
        const newProduct = {
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code, 
            stock: product.stock,
            id,
        }

        const checkExistence = products.findIndex(product => product.code === newProduct.code)

        if (checkExistence === -1) {
            products.push(newProduct);
        } else {
            throw new Error ("El código del producto ya existe")
        }

        const dataToJson = JSON.stringify(products);
        fs.writeFileSync(this.path, dataToJson)

    }

    getProducts() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data)
        } else {
            console.log("[]")
            return []
        }
    }

    async getProductById (id) {
        const products = await this.getProducts();
        const index = await products.findIndex(product => product.id === id)

        if (index === -1) {
            throw new Error ("El ID no se ha encontrado en los productos.")
        } else {
            console.log(products[index])
        }
    }

    async updateProduct(id, product) {
        const products = await this.getProducts();
        const index = await products.findIndex(product => product.id === id)

        if (index === -1) {
            throw new Error("El ID no se ha encontrado");
        } else {
            const updatedProduct = { ...products[index], ...product, id}
            products.splice(index, 1, updatedProduct)
            console.log(products)
            const dataToJson = JSON.stringify(products);
            fs.writeFileSync(this.path, dataToJson)
        }

    }


    async deleteProduct(id) {
        const products = await this.getProducts();
        const index = await products.findIndex(product => product.id === id);

        if(index !== -1) {
            products.splice(index, 1); 
            console.log(products);
            const dataToJson = JSON.stringify(products);
            fs.writeFileSync(this.path, dataToJson);
            return products
        } else {
            throw new Error("El ID ingresado no se encuentra dentro de los productos");
        }
    }



}

const newProduct = {
    title: "Ejemplo1",
    description: "ejemplo1 description", 
    price: 200, 
    thumbnail: "sin imagen", 
    code: "abc123", 
    stock: 20
}

const newProduct2 = {
    title: "Ejemplo2",
    description: "ejemplo2 description", 
    price: 500, 
    thumbnail: "sin imagen", 
    code: "abc1234", 
    stock: 1
}

const productManager = new ProductManager('./products.json');
/* productManager.addProduct(newProduct);
productManager.addProduct(newProduct2); */

/* productManager.getProducts(); */
/* productManager.getProductById(1); */
/* productManager.updateProduct(1, {"title": "producto1Actualizado", "stock": 200}) */
productManager.deleteProduct(1)
