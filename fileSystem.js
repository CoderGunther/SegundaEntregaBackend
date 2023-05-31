import { promises as fs } from "fs";
class ProductManager {
  constructor() {
    this.patch = "./productos.txt";
    this.products = [];
  }
  static id = 0;

  addProduct = async (title, description, price, imagen, code, stock) => {
    ProductManager.id++;
    let newProduct = {
      title,
      description,
      price,
      imagen,
      code,
      stock,
      id: ProductManager.id,
    };
    this.products.push(newProduct);
    await fs.writeFile(this.patch, JSON.stringify(this.products));
  };
  readProducts = async () => {
    let respuesta = await fs.readFile(this.patch, "utf-8");
    return this.patch, JSON.parse(respuesta);
  };

  getProducts = async (id) => {
    let respuesta2 = await this.readProducts();
    return console.log(respuesta2);
  };

  getProductsById = async (id) => {
    let respuesta3 = await this.readProducts();
    if (!respuesta3.find((product) => product.id === id)) {
      console.log("producto no encontrado");
    } else {
      console.log(respuesta3.find((product) => product.id === id));
    }
  };
  deleteProductsById = async (id) => {
    let respuesta3 = await this.readProducts();
    let productFilter = respuesta3.filter((products) => products.id != id);
    await fs.writeFile(this.patch, JSON.stringify(productFilter));
    //console.log("producto eliminado");
  };
  updateProducts = async ({ id, ...producto }) => {
    await this.deleteProductsById(id);
    let productOld = await this.readProducts();
    let productsModif = [{ ...producto, id }, ...productOld];
    await fs.writeFile(this.patch, JSON.stringify(productsModif));
  };
}
const productos = new ProductManager();
/*productos.addProduct(
  "Titulo1",
  "description1",
  "1000",
  "imagen1",
  "Cristian123",
  5
);
productos.addProduct(
  "Titulo2",
  "description2",
  "3000",
  "imagen2",
  "Cristian124",
  10
);
productos.addProduct(
  "Titulo3",
  "description3",
  "5000",
  "imagen3",
  "Cristian125",
  15
);*/
//productos.getProducts();
//productos.getProductsById(1);
//productos.deleteProductsById(1);
productos.updateProducts({
  title: "Titulo3",
  description: "description3",
  price: "5000",
  imagen: "imagen3",
  code: "Cristian125",
  stock: 15,
  id: 3,
});
