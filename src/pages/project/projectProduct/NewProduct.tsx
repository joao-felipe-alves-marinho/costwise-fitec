import { useState } from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, FormControlLabel, Icon, Stack, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { createProduct } from '../../../shared/services/api/productService/ProductService';
import { ProductContext, ProductData } from '../../../shared/types/Types';

const NewProductSchema = yup.object({
    name_product: yup.string().required('Esse campo é obrigatório.').min(5, 'O nome do membro deve ter pelo menos 5 caracteres.').max(255, 'O nome do projeto deve ter no máximo 255 caracteres.'),
    description_product: yup.string().max(255, 'A descrição do projeto deve ter no máximo 500 caracteres.'),
    type: yup.string().required('Esse campo é obrigatório.').oneOf(['HARDWARE', 'SOFTWARE', 'OTHER'], 'O tipo do produto deve ser HARDWARE, SOFTWARE ou OTHER.'),
    license: yup.boolean().required('Esse campo é obrigatório.'),
    cost: yup.number().required('Esse campo é obrigatório.').min(0, 'O custo do produto deve ser maior ou igual a 0.'),
    amount: yup.number().required('Esse campo é obrigatório.').min(0, 'A quantidade do produto deve ser maior ou igual a 0.'),
});

export default function NewProduct(props: ProductContext) {
    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            name_product: '',
            description_product: '',
            type: '',
            license: false,
            cost: 0,
            amount: 0,
        },
        resolver: yupResolver(NewProductSchema),
        mode: 'onChange'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const params = useParams();
    const project_id = parseInt(params.id ?? '');


    function onSubmit(data: ProductData) {
        setIsLoading(true);
        setSuccess(false);
        createProduct(project_id, data)
            .then((response) => {
                setSuccess(true);
                props.setProducts((oldProducts) => {
                    if (oldProducts && response) {
                        return [...oldProducts, response];
                    }
                    return [];
                });
            })
            .catch(() => {
                console.error('Erro ao criar novo produto.');
            })
            .finally(() => {
                setIsLoading(false);
                setSuccess(false);
            });
    }

    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(oldOpen => !oldOpen);
    }

    return (
        <>
            <Fab variant='extended' color='primary' onClick={toggleOpen} >
                Novo Produto
                <Icon>add</Icon>
            </Fab>
            <Dialog
                open={open}
                onClose={toggleOpen}
                fullWidth
                component='form'
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogTitle>Novo Produto</DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack spacing={2} >
                        <TextField
                            {...register('name_product')}
                            error={!!errors.name_product}
                            helperText={errors.name_product?.message}
                            disabled={isLoading || success}
                            label='Nome do Produto'
                            placeholder='Produto 1'
                            required
                            fullWidth
                        />
                        <TextField
                            {...register('description_product')}
                            error={!!errors.description_product}
                            helperText={errors.description_product?.message}
                            disabled={isLoading || success}
                            label='Descrição do Produto'
                            placeholder='Descrição do Produto 1'
                            fullWidth
                        />
                        <TextField
                            {...register('type')}
                            error={!!errors.type}
                            helperText={errors.type?.message}
                            disabled={isLoading || success}
                            label='Tipo do Produto'
                            placeholder='(HARDWARE, SOFTWARE ou OTHER)'
                            required
                            fullWidth
                        />
                        <TextField
                            {...register('cost')}
                            error={!!errors.cost}
                            helperText={errors.cost?.message}
                            disabled={isLoading || success}
                            label='Custo do Produto'
                            placeholder='0'
                            required
                            type='number'
                            fullWidth
                        />
                        <TextField
                            {...register('amount')}
                            error={!!errors.amount}
                            helperText={errors.amount?.message}
                            disabled={isLoading || success}
                            label='Quantidade do Produto'
                            placeholder='0'
                            required
                            type='number'
                            fullWidth
                        />
                        <FormControlLabel
                            control={
                                <Controller
                                    name="license"
                                    control={control}
                                    render={({ field }) => <Checkbox {...field} />}
                                />
                            }
                            label="Licenciado?"
                        />
                        {errors?.license && (
                            <p
                                style={{ color: 'red' }}
                            >{`Error: ${errors?.license?.message}`}</p>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleOpen} type='submit' disabled={!isDirty || !isValid} >
                        Criar novo produto
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}