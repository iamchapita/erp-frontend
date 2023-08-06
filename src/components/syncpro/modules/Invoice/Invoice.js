import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { invoiceTableHead } from '../../../../data/util';
import { Title } from '../../../Title';
import { DataGrid } from '@mui/x-data-grid';
import InputComponent from '../../../InputComponent';
import { useFormInvoices } from '../../../../hooks/useFormInvoices';
import { loadInvoices, uploadImage, imageUploaded, invoiceActive, invoicesLoaded, uploadInvoice} from '../../../../actions/invoice.actions';


export const Invoice = React.memo(() => {

    const dispatch = useDispatch();
    const { accessToken } = useSelector(state => state.auth);
    const invoices = useSelector(state => state.invoice.invoices);
    const invoiceActive = useSelector(state => state.invoice.invoice);
    useEffect(() => {
        accessToken && dispatch(loadInvoices(accessToken))
    }, [accessToken, dispatch])

    const handlePost = (e) => {
        e.preventDefault();
        console.log('Form', formState);
        dispatch(uploadInvoice(formState, accessToken))
    }


    const handleFileChange = (e) => {
        const files = e.target.files
        if (files) {
            dispatch(uploadImage(files, handleInputChange))

        }
    }


    const [formState, handleInputChange, , handleSubmit] =
        useFormInvoices({
            id: '',
            idCustomerFK: '',
            idSellerFK: '',
            idPurchaseOrderFK: '',
            invoiceCode: '',
            cai: '',
            rtn: '',
            invoiceType: '',
            saleDate: '',
            dueDate: '',
            creditDays: '',
            invoiceNotes: ''
        })

    return (
        <div className='p-5 text-start w-full'>
            <Title title={'Facturas'} />
            <div
                className='grid grid-cols-1'
            >
                {invoices && <DataGrid className='col-span-1'
                    autoHeight
                    density='compact'
                    columns={invoiceTableHead}
                    rows={invoices}
                    initialState={
                        {
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }
                    }
                    pageSizeOptions={[5, 10, 20]}

                />}
            </div>
            <form
                onSubmit={handlePost}
                className='my-2'>
                <Title title={'Agregar factura'} />
                <div className='[&>*]:my-2 [&>*]:md:m-2 [&>*]:[&>*]:mb-2 grid grid-cols-1 md:grid-cols-2 [&>*]:items-center px-5 rounded bg-white sm:grid-cols-2'>
                    <div className=''>
                        <p className='text-custom-150 font-normal'>Nombre del producto: </p>
                        <InputComponent handleInputChange={handleInputChange}
                            name={'name'}

                            className={'w-full'} required={true} placeholder={'Nombre del producto'} />
                    </div>
                    <div>
                        <p className='text-custom-150 font-normal'>Descripción: </p>

                        <textarea
                            required={true}
                            className='w-full
                            h-20
                            p-2
                            rounded
                        placeholder:text-custom-100
                            bg-inherit
                        border-custom-100
                        focus:outline-none
                        ring-0
                        focus:ring-0
                        outline-none
                        focus:border-custom-400'
                            placeholder='Descripción del producto'
                            name='description'
                            value={formState.description}
                            onChange={(e) => { handleInputChange(e, 100) }}
                        />
                        <p className='text-sm text-custom-300 font-normal'>
                            Caracteres restantes: {100 - formState.description.length}
                        </p>
                    </div>
                    <div>
                        <p className='text-custom-150 font-normal'>Código de producto </p>
                        <InputComponent
                            required={true}
                            limit={5}
                            className={'w-full'} name={'productCode'} handleInputChange={handleInputChange}
                            placeholder={'Código de producto'} />

                    </div>

                    <div>
                        <p className='text-custom-150 font-normal'>Precio sujeto a impuestos: </p>
                        <InputComponent
                            required={true}
                            className={'w-full'} name={'taxablePrice'} handleInputChange={handleInputChange}
                            placeholder={'Precio de venta'} />
                    </div>

                    <div>
                        <p className='text-custom-150 font-normal'>Precio exento de impuestos: </p>
                        <InputComponent
                            required={true}
                            className={'w-full'} name={'taxExemptPrice'} handleInputChange={handleInputChange}
                            placeholder={'Precio excento de impuestos'} />

                    </div>

                    <div>
                        <p className='text-custom-150 font-normal'>Precio de venta: </p>
                        <InputComponent
                            required={true}
                            className={'w-full'} name={'salePrice'} handleInputChange={handleInputChange}
                            placeholder={'Precio de venta'} />
                    </div>

                    <div>
                        <p className='text-custom-150 font-normal'>Fecha de elaboración: </p>
                        <InputComponent
                            required={true}
                            type={'date'}
                            className={'w-full'} name={'elaborationDate'} handleInputChange={handleInputChange}
                            placeholder={'Fecha de elaboración'} />

                    </div>

                    <div>
                        <p className='text-custom-150 font-normal'>Fecha de expiración: </p>
                        <InputComponent
                            required={true}
                            type={'date'}
                            className={'w-full'} name={'expirationDate'} handleInputChange={handleInputChange}
                            placeholder={'Fecha de expiración'} />
                    </div>
                    <div>
                        <p className='text-custom-150 font-normal'>Imagenes: </p>
                        <InputComponent
                            required={true}
                            className={'w-full'} name={'imageUrls'}
                            handleInputChange={handleFileChange}
                            placeholder={'Imagenes'}
                            type={'file'}
                            multiple={true}
                            accept={'image/*'}

                        />


                    </div>

                    <div />

                    <div>
                        <p className='text-custom-150 font-normal'>Estado: </p>
                        <select
                            className='w-full
                        h-10
                        p-2
                        rounded
                        placeholder:text-custom-100
                        bg-inherit
                        border-custom-100
                        focus:outline-none
                        ring-0
                        focus:ring-0
                        outline-none
                        focus:border-custom-400

                        '
                            name='status'
                            value={formState.status}
                            onChange={handleInputChange}

                        >
                            <option
                                className='
                            text-custom-100
                            bg-custom-300
                            hover:bg-custom-250
                            active:bg-custom-200
                            
                            '
                                value='1'>Activo</option>
                            <option className=' text-custom-100
                            bg-custom-300
                            hover:bg-custom-250
                            active:bg-custom-200
                        
            
                            ' value='0'>Inactivo</option>
                        </select>
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='
                        w-full
                        h-10
                        p-2
                        rounded
                        text-custom-100
                        bg-custom-300
                        hover:bg-custom-250
                        active:bg-custom-200
                        focus:outline-none
                        ring-0
                        focus:ring-0
                        outline-none
                        focus:border-custom-400
                        font-semibold
                        '>
                            Agregar producto
                        </button>
                    </div>

                </div>
            </form>
        </div>
    )
}
)


