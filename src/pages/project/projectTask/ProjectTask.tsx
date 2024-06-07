import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import { Task } from '../../../shared/types/Types';
import NewTask from './NewTask';
import RemoveTask from './RemoveTask';
import AssignMember from './AssignMember';
import EditTask from './EditTask';

export function ProjectTask() {
    const [tasks, setTasks] = useState<Task[]>(useLoaderData() as Task[]);

    return (
        <Stack spacing={4}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <Typography variant="h4" align='center'>Tarefas:</Typography>
                <NewTask tasks={tasks} setTasks={setTasks} />
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Prazo</TableCell>
                            <TableCell>Membros</TableCell>
                            <TableCell align='center'>Adicionar Membro</TableCell>
                            <TableCell align='center'>Editar Tarefa</TableCell>
                            <TableCell align='center'>Deletar Tarefa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>{task.name_task}</TableCell>
                                <TableCell>{task.deadline}</TableCell>
                                <TableCell>{task.members.map(member => member.name_member).join(', ') || 'Nenhuma tarefa para o membro'}</TableCell>
                                <TableCell align='center'>
                                    <AssignMember task_id={task.id} tasks={tasks} setTasks={setTasks} />
                                </TableCell>
                                <TableCell align='center'>
                                    <EditTask task_id={task.id} tasks={tasks} setTasks={setTasks} name_task={task.name_task} deadline={task.deadline!} description_task={task.description_task!} />
                                </TableCell>
                                <TableCell align='center'>
                                    <RemoveTask tasks={tasks} setTasks={setTasks} {...task} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
}