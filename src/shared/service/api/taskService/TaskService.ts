import { Api } from '../Api';

interface Project {
    user_id: number;
    name_project: string;
}

interface Members {
    id: number;
    name_member: string;
    role: string;
}

interface CreateTaskData {
    name_task: string;
    description_task?: string | null;
    deadline: string | null;
}

interface UpdateTaskData {
    name_task?: string;
    description_task?: string | null;
    deadline?: string | null;
}

interface Task {
    id: number;
    name_task: string;
    description_task: string | null;
    deadline: string | null;
    created_at: string | null;
    project_id: number;
    project: Project;
    members: Members[];

}

export async function getTasks(project_id: number): Promise<Task[] | undefined> {
    try {
        const response = await Api.get(`projects/${project_id}/tasks`);
        if (response.status === 200) {
            return response.data as Task[];
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getTask(project_id: number, task_id: number): Promise<Task | undefined> {
    try {
        const response = await Api.get(`projects/${project_id}/tasks/${task_id}`);
        if (response.status === 200) {
            return response.data as Task;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function createTask(project_id: number, task_id: number, data: CreateTaskData): Promise<Task | undefined> {
    try {
        const response = await Api.post(`projects/${project_id}/tasks/${task_id}`, data);
        if (response.status === 201) {
            return response.data as Task;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updateTask(project_id: number, task_id: number, data: UpdateTaskData): Promise<Task | undefined> {
    try {
        const response = await Api.put(`projects/${project_id}/tasks/${task_id}`, data);
        if (response.status === 200) {
            return response.data as Task;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function deleteTask(project_id: number, task_id: number): Promise<boolean> {
    try {
        const response = await Api.delete(`projects/${project_id}/tasks/${task_id}`);
        if (response.status === 204) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
    return false;
}

export async function assignMember(project_id: number, task_id: number, member_id: number): Promise<Task | undefined> {
    try {
        const response = await Api.put(`projects/${project_id}/tasks/${task_id}/${member_id}`);
        if (response.status === 200) {
            return response.data as Task;
        }
    } catch (error) {
        console.error(error);
    }
}