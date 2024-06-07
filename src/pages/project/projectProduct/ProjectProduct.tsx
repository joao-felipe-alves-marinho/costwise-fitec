import { useState } from 'react';
import { Stack, Box, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

import { Product } from '../../../shared/types/Types';
import NewProduct from './NewProduct';
import EditProduct from './EditProduct';
import RemoveProduct from './RemoveProduct';

export function ProjectProduct() {
    const [products, setProducts] = useState<Product[]>(useLoaderData() as Product[]);

    return (
        <Stack spacing={4}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <Typography variant="h4" align='center'>Produtos:</Typography>
                <NewProduct products={products} setProducts={setProducts} />
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align='center'>Tipo</TableCell>
                            <TableCell align='center'>Licenciado</TableCell>
                            <TableCell align='center'>Custo</TableCell>
                            <TableCell align='center'>Quantidade</TableCell>
                            <TableCell align='center'>Editar Produto</TableCell>
                            <TableCell align='center'>Deletar Produto</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name_product}</TableCell>
                                <TableCell align='center'>{product.type}</TableCell>
                                <TableCell align='center'>{product.license ? 'Sim' : 'Não'}</TableCell>
                                <TableCell align='center'>{product.cost}</TableCell>
                                <TableCell align='center'>{product.amount}</TableCell>
                                <TableCell align='center'>
                                    <EditProduct product_id={product.id} products={products} setProducts={setProducts} name_product={product.name_product} description_product={product.description_product!} type={product.type} cost={product.cost} amount={product.amount} license={product.license} />
                                </TableCell>
                                <TableCell align='center'>
                                    <RemoveProduct products={products} setProducts={setProducts} {...product} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
}
