import { getTasks } from '../services/api/taskService/TaskService';


export function TasksLoader(id: number) {
    return getTasks(id);
}
