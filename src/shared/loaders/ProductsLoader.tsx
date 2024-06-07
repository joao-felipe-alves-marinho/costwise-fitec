import { getProducts } from '../services/api/productService/ProductService';

export function ProductsLoader(id: number) {
    return getProducts(id);
}
