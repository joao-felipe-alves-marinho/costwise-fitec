import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';

import { Project, ProjectContext } from '../../shared/types/Types';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

interface LinkTabProps {
    label?: string;
    href?: string;
    selected?: boolean;
}

function samePageLinkNavigation(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
    if (
        event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
    ) {
        return false;
    }
    return true;
}

function LinkTab(props: LinkTabProps) {

    const navigate = useNavigate();

    return (
        <Tab
            component='a'
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                if (samePageLinkNavigation(event)) {
                    event.preventDefault();
                    navigate(props.href!);
                }
            }}
            aria-current={props.selected && 'page'}
            {...props}
        />
    );
}

export function ProjectPage() {
    const [project, setProject] = useState<Project | null>(useLoaderData() as Project);

    const [value, setValue] = useState(0);
    

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if (
            event.type !== 'click' ||
            (event.type === 'click' &&
                samePageLinkNavigation(
                    event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
                ))
        ) {
            setValue(newValue);
        }
    };



    return (
        <>
            {project ? (
                <Box my={4}>
                    <Typography mb={4} variant='h4' align='center'>
                        {project.name_project}
                    </Typography>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant='fullWidth'
                        aria-label="nav tabs example"
                        role="navigation"
                    >
                        <LinkTab label='Descrição' href={`/project/${project.id}`} />
                        <LinkTab label='Tarefas' href={`/project/${project.id}/tasks`} />
                        <LinkTab label='Membros' href={`/project/${project.id}/members`} />
                        <LinkTab label='Produtos' href={`/project/${project.id}/products`} />
                        <LinkTab label='Orçamento' href={`/project/${project.id}/budget`} />
                    </Tabs>
                    <Outlet context={{ project, setProject } satisfies ProjectContext} />
                </Box>
            ) : (
                <Typography m={16} variant='h4' align='center'>
                    Projeto não existe ou permissao negada.
                </Typography>
            )}
        </>
    );
}