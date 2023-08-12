import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "../../../Tab";
import { invoiceTableHead } from "../../../../data/util";
import { Title } from "../../../Title";
import { DataGrid } from "@mui/x-data-grid";
import InputComponent from "../../../InputComponent";
import { AutocompleteComponent } from "../../../Autocomplete";
import { useForm } from "../../../../hooks/useForm";
import { loadInvoices } from "../../../../actions/invoice.actions";
import CategoryIcon from "@mui/icons-material/Category";
import StraightenIcon from "@mui/icons-material/Straighten";


export const Invoice = React.memo(() => {
	const [clientName, setClientName] = useState('');
	const [invoiceDate, setInvoiceDate] = useState('');
	const [products, setProducts] = useState([]);
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);
  
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

const handleProductSelection = (productId, price) => {
    const updatedProducts = [...selectedProducts, { productId, price }];
    setSelectedProducts(updatedProducts);
    setTotalAmount(totalAmount + price);
  };

  const handleSubmit1= async (e) => {
    e.preventDefault();

    try {
      const invoiceData = {
        clientName,
        invoiceDate,
        products: selectedProducts,
        totalAmount,
      };

      // Llamada a la función de la API para agregar la factura
     // await addInvoice(invoiceData);

      // Reiniciar el formulario después de enviar
      setClientName('');
      setInvoiceDate('');
      setSelectedProducts([]);
      setTotalAmount(0);

      alert('Factura agregada exitosamente');
    } catch (error) {
      console.error('Error al agregar la factura', error);
      alert('Error al agregar la factura');
    }
  };

	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);
	const invoices = useSelector((state) => state.invoice.invoices);
	const invoiceActive = useSelector(
		(state) => state.invoice.invoiceActive
	);
	// const categories = useSelector((state) => state.product.productCategories);
	// const unities = useSelector((state) => state.product.productUnities);

	useEffect(() => {
		accessToken && dispatch(loadInvoices(accessToken));
	}, [accessToken, dispatch]);

	// const handlePost = (e) => {
	// 	e.preventDefault();
	// 	console.log("Form", formState);
	// 	dispatch(uploadProduct(formState, accessToken));
	// };

	// const handleFileChange = (e) => {
	// 	const files = e.target.files;
	// 	if (files) {
	// 		dispatch(uploadImage(files, handleInputChange));
	// 	}
	// };

	const [formState, handleInputChange, , handleSubmit] = useForm({
		id: "",
		idCustomerFK: "",
		idSellerFK: "",
		idPurchaseOrderFK: "",
		invoiceCode: "",
		cai: "",
		rtn: "",
		invoiceType: "",
		saleDate: "",
		dueDate: "",
		creditDays: "",
		invoiceNotes: "",
	});

	// const autoCompleteCategories = {
	// 	name: "idProductCategoryFK",
	// 	handleInputChange,
	// 	dispatchProp: chargeCategories,
	// 	items: categories,
	// 	optionName: "name",
	// 	icon: <CategoryIcon className="text-custom-300" />,
	// };

	// const autoCompleteUnities = {
	// 	name: "idProductUnityFK",
	// 	handleInputChange,
	// 	dispatchProp: chargeUnities,
	// 	items: unities,
	// 	optionName: "name",
	// 	icon: <StraightenIcon className="text-custom-300" />,
	// };

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
      <form className='my-2' onSubmit={handleSubmit}>
	  <Title title={'Agregar factura'} />
       <div className="[&>*]:my-2 [&>*]:md:m-2 [&>*]:[&>*]:mb-2 grid grid-cols-1 md:grid-cols-2 [&>*]:items-center px-5 rounded bg-white sm:grid-cols-2"> 
	    <div>
		<p className='text-custom-150 font-normal'>Nombre del cliente: </p>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
			className={'w-full'}
			required={false}
			 placeholder={'Nombre del cliente'}
          />
        </div>
        <div>
		<p className='text-custom-150 font-normal'>Fecha de venta: </p>
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
			className={'w-full'}
            required
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
          <label >Total:</label>
          <span>${totalAmount}</span>
        </div>
        <button type='submit'
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
});
