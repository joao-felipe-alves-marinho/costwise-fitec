import { useState } from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, FormControlLabel, Icon, Stack, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ProductContext, ProductData } from '../../../shared/types/Types';
import { useParams } from 'react-router-dom';
import { updateProduct } from '../../../shared/services/api/productService/ProductService';

interface ProductProps extends ProductContext {
    product_id: number;
    name_product: string;
    description_product?: string | undefined;
    type: string;
    license: boolean;
    cost: number;
    amount: number;
}

const UpdateProductSchema = yup.object({
    name_product: yup.string().min(5, 'O nome do membro deve ter pelo menos 5 caracteres.').max(255, 'O nome do projeto deve ter no máximo 255 caracteres.'),
    description_product: yup.string().max(255, 'A descrição do projeto deve ter no máximo 500 caracteres.'),
    type: yup.string().oneOf(['HARDWARE', 'SOFTWARE', 'OTHER'], 'O tipo do produto deve ser HARDWARE, SOFTWARE ou OTHER.'),
    license: yup.boolean(),
    cost: yup.number().min(0, 'O custo do produto deve ser maior ou igual a 0.'),
    amount: yup.number().min(0, 'A quantidade do produto deve ser maior ou igual a 0.'),

});

export default function EditProduct(props: ProductProps) {
    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            name_product: props.name_product,
            description_product: props.description_product,
            type: props.type,
            license: props.license,
            cost: props.cost,
            amount: props.amount,
        },
        resolver: yupResolver(UpdateProductSchema),
        mode: 'onChange'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const params = useParams();
    const project_id = parseInt(params.id ?? '');


    function onSubmit(data: Partial<ProductData>) {
        setIsLoading(true);
        setSuccess(false);
        updateProduct(project_id, props.product_id, data)
            .then(() => {
                setSuccess(true);
                window.location.reload();
            })
            .catch(() => {
                console.error('Erro ao editar membro.');
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
            <Fab size='small' color='primary' onClick={toggleOpen} >
                <Icon>edit</Icon>
            </Fab>
            <Dialog
                open={open}
                onClose={toggleOpen}
                fullWidth
                component='form'
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogTitle>Atualizar Produto</DialogTitle>
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
                        Atualizar membro
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}