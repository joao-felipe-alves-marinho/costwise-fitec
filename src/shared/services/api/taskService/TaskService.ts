import { Task } from '../../../types/Types';
import { Api } from '../Api';

type TaskData = Pick<Task, 'name_task' | 'description_task' | 'deadline'>;

export async function getTasks(project_id: number): Promise<Task[] | null> {
    return await Api.get(`projects/${project_id}/tasks`).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as Task[];
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function getTask(project_id: number, task_id: number): Promise<Task | null> {
    return await Api.get(`projects/${project_id}/tasks/${task_id}`).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as Task;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}


export async function createTask(project_id: number, task_id: number, data: TaskData): Promise<Task | null> {
    return await Api.post(`projects/${project_id}/tasks/${task_id}`, data).then((response) => {
        if (response.status !== 201) {
            return null;
        }
        return response.data as Task;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function updateTask(project_id: number, task_id: number, data: Partial<TaskData>): Promise<Task | null> {
    return await Api.put(`projects/${project_id}/tasks/${task_id}`, data).then((response) => {
        if (response.status !== 201) {
            return null;
        }
        return response.data as Task;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function deleteTask(project_id: number, task_id: number): Promise<boolean> {
    return await Api.delete(`projects/${project_id}/tasks/${task_id}`)
        .then(() => { return true; })
        .catch((error) => {
            console.error(error);
            return false;
        });
}

export async function assignMember(project_id: number, task_id: number, member_id: number): Promise<Task | null> {
    return await Api.put(`projects/${project_id}/tasks/${task_id}/${member_id}`).then((response) => {
        if (response.status !== 201) {
            return null;
        }
        return response.data as Task;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}