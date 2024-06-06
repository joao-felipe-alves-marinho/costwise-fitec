export interface User {
    id: number;
    email: string;
    username: string;
    projects: Pick<Project, 'id' | 'name_project'>[]
}

export interface Project {
    id: number;
    name_project: string;
    description_project?: string | undefined;
    deadline: string | undefined;
    created_at: string | null;
    budget: number | null;
    expected_budget?: number | undefined;
    total_cost_products: number | null;
    total_cost_members: number | null;
    owner: Pick<User, 'username' | 'email'>;
    user_id: number;
    tasks: Pick<Task, 'id' | 'name_task'>[];
    members: Pick<Member, 'id' | 'name_member'>[];
    products: Pick<Product, 'id' | 'name_product'>[];
}

export type ProjectData = Pick<Project,
    'name_project' |
    'description_project' |
    'deadline' |
    'expected_budget'>

interface FromProject {
    project_id: number;
    project: Pick<Project, 'name_project' | 'user_id'>;
}

export interface Task extends FromProject {
    id: number;
    name_task: string;
    description_task: string | null;
    deadline: string | null;
    created_at: string | null;
    members: Pick<Member, 'id' | 'name_member' | 'role'>[];
}

export interface Member extends FromProject {
    id: number;
    name_member: string;
    role: string;
    salary: number;
    tasks: Pick<Task, 'id' | 'name_task'>[]
}

export interface Product extends FromProject {
    id: number;
    name_product: string;
    description_product: string | null;
    type: 'HARDWARE' | 'SOFTWARE' | 'OTHER';
    license: boolean;
    cost: number;
    amount: number;
}