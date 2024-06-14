import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { BarChart, Gauge, gaugeClasses } from '@mui/x-charts';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { Budget } from '../../../shared/types/Types';


export function ProjectBudget() {
    const budgets = useLoaderData() as Budget;
    const project = budgets.project;
    const totalCostMembers = budgets.totalCostMembers;
    const totalCostProductsType = budgets.totalCostProductsType;
    const totalCostProductsLicense = budgets.totalCostProductsLicense;

    const navigation = useNavigation();

    if (navigation.state === 'loading') {
        return <LinearProgress sx={{mt: 32}} />;
    }

    return (
        <Grid container spacing={4}>
            <Grid item xs={4}>
                <Box
                    component={Paper}
                    elevation={8}
                    p={4}
                    display='flex'
                    flexDirection='column'
                    alignItems='flex-start'
                    gap={4}
                >
                    <Typography variant="h4" align='center'>Orçamento:</Typography>
                    <Gauge
                        height={250}
                        value={project.budget}
                        valueMax={project.expected_budget}
                        startAngle={-110}
                        endAngle={110}
                        sx={{
                            [`& .${gaugeClasses.valueText}`]: {
                                fontSize: 30,
                                fontFamily: 'Arial',
                                transform: 'translate(0px, 0px)',
                            },
                        }}
                        text={
                            ({ value, valueMax }) => `${value} / ${valueMax}`
                        }
                    />
                </Box>
            </Grid>
            <Grid item xs={8}>
                <Box component={Paper} elevation={8} p={2}
                    display='flex' flexDirection='column' alignItems='center' gap={1}
                >
                    <Typography variant="h4" align='center'>Custos Gerais</Typography>
                    <BarChart
                        width={500}
                        height={300}
                        series={[
                            { data: [project.total_cost_members], label: 'membros', id: 'membros' },
                            { data: [project.total_cost_products], label: 'produtos', id: 'produtos' },
                        ]}
                        xAxis={[{ data: ['Custos Gerais',], scaleType: 'band' }]}
                    />
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box component={Paper} elevation={8} p={2}
                    display='flex' flexDirection='column' alignItems='center' gap={1}
                >
                    <Typography variant="h4" align='center'>Custos de Produtos pela licensa</Typography>
                    <BarChart
                        width={500}
                        height={300}
                        series={[
                            { data: [totalCostProductsLicense.license_cost], label: 'Com Licença', id: 'Com Licença' },
                            { data: [totalCostProductsLicense.no_license_cost], label: 'Sem Licença', id: 'Sem Licença' },
                        ]}
                        xAxis={[{ data: ['Custos Gerais',], scaleType: 'band' }]}
                    />
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box component={Paper} elevation={8} p={2}
                    display='flex' flexDirection='column' alignItems='center' gap={1}
                >
                    <Typography variant="h4" align='center'>Custos de Produtos pelo Tipo</Typography>
                    <BarChart
                        width={500}
                        height={300}
                        series={[
                            { data: [totalCostProductsType.HARDWARE], label: 'Hardware', id: 'Hardware' },
                            { data: [totalCostProductsType.SOFTWARE], label: 'Software', id: 'Software' },
                            { data: [totalCostProductsType.OTHER], label: 'Outros', id: 'Outros' },
                        ]}
                        xAxis={[{ data: ['Custos Produtos por Tipo',], scaleType: 'band' }]}
                    />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box component={Paper} elevation={8} p={2}
                    display='flex' flexDirection='column' alignItems='center' gap={1}
                >
                    <Typography variant="h4" align='center'>Custos de cada Membro</Typography>
                    <BarChart
                        width={500}
                        height={300}
                        series={totalCostMembers.Members.map((member) => ({ data: [member.total_cost], label: member.member, id: member.member }))}
                        xAxis={[{ data: ['Custos de cada membro',], scaleType: 'band' }]}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}