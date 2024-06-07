import { Product } from '../../../types/Types';
import { Api } from '../Api';

type ProductData = Pick<Product,
    'name_product' |
    'description_product' |
    'type' |
    'license' |
    'cost' |
    'amount'>;

export async function getProducts(project_id: number): Promise<Product[] | null> {
    return await Api.get(`projects/${project_id}/products`).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as Product[];
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function getProduct(project_id: number, product_id: number): Promise<Product | null> {
    return await Api.get(`projects/${project_id}/products/${product_id}`).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as Product;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function createProduct(project_id: number, data: ProductData): Promise<Product | null> {
    return await Api.post(`projects/${project_id}/products`, data).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as Product;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function updateProduct(project_id: number, product_id: number, data: Partial<ProductData>): Promise<Product | null> {
    return await Api.put(`projects/${project_id}/products/${product_id}`, data).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as Product;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function deleteProduct(project_id: number, product_id: number): Promise<boolean> {
    return await Api.delete(`projects/${project_id}/products/${product_id}`)
        .then(() => { return true; })
        .catch((error) => {
            console.error(error);
            return false;
        });
}