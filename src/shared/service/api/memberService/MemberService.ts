import { Api } from '../Api';

interface Project {
    user_id: number;
    name_project: string;
}

interface Task {
    id: number;
    name_task: string;
}

interface CreateMemberData {
    name_member: string;
    role: string;
    salary: number | null;
}

interface UpdateMemberData {
    name_member: string;
    role: string;
    salary: number | null;
}

interface Member {
    id: number;
    name_member: string;
    role: string;
    salary: number;
    project_id: number;
    project: Project;
    tasks: Task[];

}

export async function getMembers(project_id: number): Promise<Member[] | undefined> {
    try {
        const response = await Api.get(`projects/${project_id}/members`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getMember(project_id: number, member_id: number): Promise<Member | undefined> {
    try {
        const response = await Api.get(`projects/${project_id}/members/${member_id}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function createMember(project_id: number, member_id: number, data: CreateMemberData): Promise<Member | undefined> {
    try {
        const response = await Api.post(`projects/${project_id}/members/${member_id}`, data);
        if (response.status === 201) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updateMember(project_id: number, member_id: number, data: UpdateMemberData): Promise<Member | undefined> {
    try {
        const response = await Api.put(`projects/${project_id}/members/${member_id}`, data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function deleteMember(project_id: number, member_id: number): Promise<boolean> {
    try {
        const response = await Api.delete(`projects/${project_id}/members/${member_id}`);
        if (response.status === 204) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
    return false;
}

export async function assignMember(project_id: number, member_id: number, task_id: number): Promise<Task | undefined> {
    try {
        const response = await Api.put(`projects/${project_id}/members/${member_id}/${task_id}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}