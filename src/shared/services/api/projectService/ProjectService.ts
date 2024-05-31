import { Api } from '../Api';

interface User {
    username: string;
    email: string;

}

interface Member {
    id: number;
    name_member: string
}

interface MembersCosts {
    Members: [{
        'member': string,
        'total_cost': number
    }]
}

interface Product {
    id: number;
    name_product: string;
}

interface ProductByTypeCost {
    'HARDWARE': number,
    'SOFTWARE': number,
    'OTHER': number
}

interface ProductByLicenseCost {
    'license_cost': number,
    'no_license_cost': number
}


interface Task {
    id: number;
    name_task: string;

}

interface CreateProjectData {
    name_project: string;
    description_project?: string | null;
    deadline: string | null;
    expected_budget?: number;
}

interface UpdateProjectData {
    name_project?: string;
    description_project?: string | null;
    deadline?: string | null;
    expected_budget?: number;
}

interface Project {
    id: number;
    name_project: string;
    description_project: string | null;
    deadline: string | null;
    created_at: string | null;
    budget: number | null;
    expected_budget: number;
    total_cost_products: number | null;
    total_cost_members: number | null;
    owner: User;
    user_id: number;
    members: Member[];
    products: Product[];
    tasks: Task[];
}

export async function getProjects(): Promise<Project[] | undefined> {
    try {
        const response = await Api.get('/projects');
        if (response.status === 200) {
            return response.data as Project[];
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getProject(id: string): Promise<Project | undefined> {
    try {
        const response = await Api.get(`/projects/${id}`);
        if (response.status === 200) {
            return response.data as Project;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function createProject(data: CreateProjectData): Promise<Project | undefined> {
    try {
        const response = await Api.post('/projects', data);
        if (response.status === 201) {
            return response.data as Project;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updateProject(id: string, data: UpdateProjectData): Promise<Project | undefined> {
    try {
        const response = await Api.put(`/projects/${id}`, data);
        if (response.status === 200) {
            return response.data as Project;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function deleteProject(id: string): Promise<boolean> {
    try {
        const response = await Api.delete(`/projects/${id}`);
        if (response.status === 204) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
    return false;
}

export async function totalCostMember(id: string): Promise<MembersCosts | undefined> {
    try {
        const response = await Api.get(`/projects/${id}/members_costs`);
        if (response.status === 200) {
            return response.data as MembersCosts;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function totalCostProductsByType(id: string): Promise<ProductByTypeCost | undefined> {
    try {
        const response = await Api.get(`/projects/${id}/products_by_type`);
        if (response.status === 200) {
            return response.data as ProductByTypeCost;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function totalCostProductsByLicense(id: string): Promise<ProductByLicenseCost | undefined> {
    try {
        const response = await Api.get(`/projects/${id}/products_by_license`);
        if (response.status === 200) {
            return response.data as ProductByLicenseCost;
        }
    } catch (error) {
        console.error(error);
    }
}