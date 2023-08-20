import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { invoiceTableHead } from "../../../../data/util";
import { Title } from "../../../Title";
import { DataGrid } from "@mui/x-data-grid";
import InputComponent from "../../../InputComponent";
import { useForm } from "../../../../hooks/useForm";
import { loadInvoices } from "../../../../actions/invoice.actions";
import { generateRandomCAI } from "../../../utils/randomCai";
import { uploadInvoice } from "../../../../actions/invoice.actions";

export const Invoice = ({
	formState,
	selectedRow,
	handleInputChange,
	reset,
})=> {
	const [clientName, setClientName] = useState('');
	const [creditDays, setCreditDays] = useState(0);
	const [invoiceDate, setInvoiceDate] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [products, setProducts] = useState([]);
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const [cai, setCai] = useState(generateRandomCAI);
	const [rtn, setRtn] = useState(0);
	const [error, setError] = useState('');
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
	const { accessToken } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const invoices = useSelector((state) => state.invoice);

	useEffect(() => {
		accessToken && dispatch(loadInvoices(accessToken));
	}, [accessToken, dispatch]);

	const handleProductSelection = (productId, price) => {
		const updatedProducts = [...selectedProducts, { productId, price }];
		setSelectedProducts(updatedProducts);
		setTotalAmount(totalAmount + price);
	  };
	
	const handlePost = (e) => {
		e.preventDefault();
		dispatch(uploadInvoice(formState, accessToken));
		reset();
	};

	const handleRtnChange = (event) => {
		const inputValue = event.target.value;
		setRtn(inputValue);
	
		if (inputValue.length === 14 && /^\d+$/.test(inputValue)) {
		  setError('');
		  setSubmitButtonDisabled(false); // Habilitar el botón si la validación es correcta
		} else {
		  setError('El RTN debe tener 14 dígitos numéricos.');
		  setSubmitButtonDisabled(true); // Deshabilitar el botón si la validación falla
		}
	  };
	
	/*useEffect(() => {
		const fetchProducts = async () => {
		  try {
			const productsData = await getProducts();
			setProducts(productsData);
		  } catch (error) {
			console.error('Error al obtener la lista de productos', error);
		  }
		};
	
fetchProducts();
  }, []);
*/

	return (
		<div className="p-5 text-start w-full">
			<Title title={"Facturas"} />
			<div className="grid grid-cols-1">
				{invoices && (
					<DataGrid
						className="col-span-1"
						autoHeight
						density="compact"
						columns={invoiceTableHead}
						rows={invoices}
						initialState={{
							pagination: {
								paginationModel: { page: 0, pageSize: 5 },
							},
						}}
						pageSizeOptions={[5, 10, 20]}
					/>
				)}
			</div>
			<div>
      <form className='my-2' onSubmit={handlePost}>
	  <Title title={'Agregar factura'} />
       <div className="[&>*]:my-2 [&>*]:md:m-2 [&>*]:[&>*]:mb-2 grid grid-cols-1 md:grid-cols-2 [&>*]:items-center px-5 rounded bg-white sm:grid-cols-2"> 
	   <div>
          <label >CAI:</label>
		  <hr></hr>
          <span style={{ fontSize: '22px' }}>{cai}</span>
        </div>
		<div>
		<p className='text-custom-150 font-normal'>Nombre del cliente: </p>
          <InputComponent
		  	handleInputChange={handleInputChange}
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
			className={'w-full'}
			required={false}
			 placeholder={'Nombre del cliente'}
          />
        </div>
		<div>
		<p className='text-custom-150 font-normal'>RTN: </p>
          <InputComponent
		  	handleInputChange={handleInputChange}
            type="text"
            value={rtn}
            onChange={handleRtnChange}
			className={'w-full'}
			required
			placeholder={'00000000000000'}
          />
		  {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
		
        <div>
		<p className='text-custom-150 font-normal'>Fecha de venta: </p>
          <InputComponent
		  	handleInputChange={handleInputChange}
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
			className={'w-full'}
			required
          />
        </div>
		<div>
		<p className='text-custom-150 font-normal'>Fecha de vencimiento: </p>
          <InputComponent
		 	handleInputChange={handleInputChange}
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
			className={'w-full'}
			required={false}
          />
        </div>
        <div>
          <label>Productos:</label>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.name} (${product.price})
                <button
                  type="button"
                  onClick={() => handleProductSelection(product.id, product.price)}
                >
                  Agregar
                </button>
              </li>
            ))}
          </ul>
        </div>
		<div>
		<p className='text-custom-150 font-normal'>Días de crédito: </p>
          <InputComponent
		  	handleInputChange={handleInputChange}
            type="number"
            value={creditDays}
            onChange={(e) => setCreditDays(e.target.value)}
			className={'w-full'}
			required={false}
          />
        </div>
        <div>
          <label >Total:</label>
          <span>${totalAmount}</span>
        </div>
        <button 
			disabled={submitButtonDisabled}
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
            '>Agregar Factura</button>
			</div>
      </form>
    </div>	
</div>
	);
};
