import { Member } from '../../../types/Types';
import { Api } from '../Api';

type MemberData = Pick<Member,
    'name_member' |
    'role' |
    'salary'>;

export async function getMembers(project_id: number): Promise<Member[] | null> {
    return await Api.get(`projects/${project_id}/members`).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as Member[];
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function getMember(project_id: number, member_id: number): Promise<Member | null> {
    return await Api.get(`projects/${project_id}/members/${member_id}`).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as Member;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function createMember(project_id: number, data: MemberData): Promise<Member | null> {
    return await Api.post(`projects/${project_id}/members`, data).then((response) => {
        if (response.status !== 201) {
            return null;
        }
        return response.data as Member;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function updateMember(project_id: number, member_id: number, data: Partial<MemberData>): Promise<Member | null> {
    return await Api.put(`projects/${project_id}/members/${member_id}`, data).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as Member;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function deleteMember(project_id: number, member_id: number): Promise<boolean> {
    return await Api.delete(`projects/${project_id}/members/${member_id}`)
        .then(() => { return true; })
        .catch((error) => {
            console.error(error);
            return false;
        });
}

export async function assignTask(project_id: number, member_id: number, task_id: number): Promise<Member | null> {
    return await Api.put(`projects/${project_id}/members/${member_id}/${task_id}`).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as Member;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}
