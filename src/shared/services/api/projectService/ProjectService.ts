import { Project, ProjectData } from '../../../types/Types';
import { Api } from '../Api';


interface MembersCosts {
    Members: [{
        member: string;
        total_cost: number;
    }]
}

interface ProductByTypeCost {
    HARDWARE: number;
    SOFTWARE: number;
    OTHER: number;
}

interface ProductByLicenseCost {
    license_cost: number;
    no_license_cost: number;
}


export async function getProjects(): Promise<Project[] | null> {
    return Api.get('/projects',).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as Project[];
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function getProject(id: string): Promise<Project | null> {
    return await Api.get(`/projects/${id}`).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as Project;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function createProject(data: ProjectData): Promise<Project | null> {
    return await Api.post('/projects', data).then((response) => {
        if (response.status !== 201) {
            return null;
        }
        return response.data as Project;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function updateProject(id: string, data: Partial<ProjectData>): Promise<Project | null> {
    return await Api.put(`/projects/${id}`, data).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as Project;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function deleteProject(id: string): Promise<boolean> {
    return await Api.delete(`/projects/${id}`)
        .then(() => { return true; })
        .catch((error) => {
            console.error(error);
            return false;
        });
}

export async function totalCostMember(id: string): Promise<MembersCosts | null> {
    return await Api.get(`/projects/${id}/members_costs`).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as MembersCosts;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function totalCostProductsByType(id: string): Promise<ProductByTypeCost | null> {
    return await Api.get(`/projects/${id}/products_by_type`).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as ProductByTypeCost;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function totalCostProductsByLicense(id: string): Promise<ProductByLicenseCost | null> {
    return await Api.get(`/projects/${id}/products_by_license`).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as ProductByLicenseCost;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}