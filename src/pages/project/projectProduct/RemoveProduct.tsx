import { useState } from 'react';
import { Fab, Icon, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

import { ProductContext } from '../../../shared/types/Types';
import { useParams } from 'react-router-dom';
import { deleteProduct } from '../../../shared/services/api/productService/ProductService';

interface ProductProps extends ProductContext {
    id: number;
}

export default function RemoveProduct(props: ProductProps) {
    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(oldOpen => !oldOpen);
    }

    const params = useParams();
    const project_id = parseInt(params.id ?? '');

    function handleDelete() {
        deleteProduct(project_id, props.id)
            .then(() => {
                const newProducts = props.products?.filter(p => p.id !== props.id);
                if (newProducts) {
                    props.setProducts((oldProducts) => {
                        if (oldProducts) {
                            return newProducts;
                        }
                        return [];
                    });
                }
            })
            .catch(() => {
                console.error('Error ao deletar projeto.');
            })
            .finally(() => {
                toggleOpen();
            });
    }

    return (
        <>
            <Fab
                size='small'
                color='error'
                onClick={toggleOpen}
            >
                <Icon>delete</Icon>
            </Fab>
            <Dialog
                open={open}
                onClose={toggleOpen}
                fullWidth
            >
                <DialogTitle align='center' >
                    Deseja realmente deletar o produto?
                </DialogTitle>
                <DialogActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}
                >
                    <Button variant='outlined' onClick={toggleOpen}>Cancelar</Button>
                    <Button onClick={handleDelete}>Confirmar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}