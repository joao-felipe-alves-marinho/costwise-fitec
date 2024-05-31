import { Api } from '../Api';

interface Project {
    user_id: number;
    name_project: string;
}

interface CreateProductData {
    name_product: string;
    description_product?: string | null;
    type: 'HARDWARE' | 'SOFTWARE' | 'OTHER';
    license: boolean;
    cost: number;
    amount: number;
}

interface UpdateProductData {
    name_product?: string;
    description_product?: string | null;
    type?: 'HARDWARE' | 'SOFTWARE' | 'OTHER';
    license?: boolean;
    cost?: number;
    amount?: number;
}

interface Product {
    id: number;
    name_product: string;
    description_product: string | null;
    type: 'HARDWARE' | 'SOFTWARE' | 'OTHER';
    license: boolean;
    cost: number;
    amount: number;
    project_id: number;
    project: Project;
}

export async function getProducts(project_id: number): Promise<Product[] | undefined> {
    try {
        const response = await Api.get(`projects/${project_id}/products`);
        if (response.status === 200) {
            return response.data as Product[];
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getProduct(project_id: number, product_id: number): Promise<Product | undefined> {
    try {
        const response = await Api.get(`projects/${project_id}/products/${product_id}`);
        if (response.status === 200) {
            return response.data as Product;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function createProduct(project_id: number, product_id: number, data: CreateProductData): Promise<Product | undefined> {
    try {
        const response = await Api.post(`projects/${project_id}/products/${product_id}`, data);
        if (response.status === 201) {
            return response.data as Product;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updateProduct(project_id: number, product_id: number, data: UpdateProductData): Promise<Product | undefined> {
    try {
        const response = await Api.put(`projects/${project_id}/products/${product_id}`, data);
        if (response.status === 200) {
            return response.data as Product;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function deleteProduct(project_id: number, product_id: number): Promise<boolean> {
    try {
        const response = await Api.delete(`projects/${project_id}/products/${product_id}`);
        if (response.status === 204) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
    return false;
}