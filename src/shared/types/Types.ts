export interface User {
    id: number;
    email: string;
    username: string;
    projects: Pick<Project, 'id' | 'name_project'>[]
}

export interface UserContext {
    user?: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
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

export interface ProjectContext {
    project: Project | null;
    setProject: React.Dispatch<React.SetStateAction<Project | null>>;
}

interface FromProject {
    project_id: number;
    project: Pick<Project, 'name_project' | 'user_id'>;
}

export interface Task extends FromProject {
    task_id: number;
    id: number;
    name_task: string;
    description_task?: string | null;
    deadline: string | null;
    created_at: string | null;
    members: Pick<Member, 'id' | 'name_member' | 'role'>[];
}

export interface TaskContext {
    tasks: Task[] | null;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export type TaskData = Pick<Task,
    'name_task' |
    'description_task' |
    'deadline'
>

export interface Member extends FromProject {
    id: number;
    name_member: string;
    role: string;
    salary: number;
    tasks: Pick<Task, 'id' | 'name_task'>[]
}

export interface MemberContext {
    members: Member[] | null;
    setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
}

export type MemberData = Pick<Member,
    'name_member' |
    'role' |
    'salary'
>

export interface Product extends FromProject {
    id: number;
    name_product: string;
    description_product?: string | null ;
    type: string;
    license: boolean;
    cost: number;
    amount: number;
}

export interface ProductContext {
    products: Product[] | null;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export type ProductData = Pick<Product,
    'name_product' |
    'description_product' |
    'type' |
    'license' |
    'cost' |
    'amount'
>