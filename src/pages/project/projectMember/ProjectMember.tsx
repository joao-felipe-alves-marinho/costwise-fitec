import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import { Member } from '../../../shared/types/Types';
import NewMember from './NewMember';
import AssignTask from './AssignTask';
import RemoveMember from './RemoveMember';
import EditMember from './EditMember';

export function ProjectMember() {
    const [members, setMembers] = useState<Member[]>(useLoaderData() as Member[]);

    return (
        <Stack spacing={4}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <Typography variant="h4" align='center'>Membros:</Typography>
                <NewMember members={members} setMembers={setMembers} />
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Cargo</TableCell>
                            <TableCell>Salario</TableCell>
                            <TableCell align='center'>Tarefa</TableCell>
                            <TableCell align='center'>Adicionar Tarefa</TableCell>
                            <TableCell align='center'>Editar Membro</TableCell>
                            <TableCell align='center'>Deletar Membro</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members.map((member) => (
                            <TableRow key={member.id}>
                                <TableCell>{member.name_member}</TableCell>
                                <TableCell>{member.role}</TableCell>
                                <TableCell>{member.salary}</TableCell>
                                <TableCell>{member.tasks.map(task => task.name_task).join(', ') || 'Nenhuma tarefa para o membro'}</TableCell>
                                <TableCell align='center'>
                                    <AssignTask member_id={member.id} members={members} setMembers={setMembers} />
                                </TableCell>
                                <TableCell align='center'>
                                    <EditMember member_id={member.id} members={members} setMembers={setMembers} name_member={member.name_member} role={member.role} salary={member.salary} />
                                </TableCell>
                                <TableCell align='center'>
                                    <RemoveMember members={members} setMembers={setMembers} {...member} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack >
    );
}