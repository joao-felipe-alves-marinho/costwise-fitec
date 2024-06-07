import { getProject, totalCostMember, totalCostProductsByLicense, totalCostProductsByType } from '../services/api/projectService/ProjectService';


export async function BudgetLoader(id: number) {
    const project = await getProject(id);
    const totalCostMembers = await totalCostMember(id);
    const totalCostProductsType = await totalCostProductsByType(id);
    const totalCostProductsLicense = await totalCostProductsByLicense(id);

    return {
        project,
        totalCostMembers,
        totalCostProductsType,
        totalCostProductsLicense
    };
}
