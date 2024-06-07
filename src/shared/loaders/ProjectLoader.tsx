import { getProject } from '../services/api/projectService/ProjectService';


export function ProjectLoader(id: number) {
    return getProject(id);
}
