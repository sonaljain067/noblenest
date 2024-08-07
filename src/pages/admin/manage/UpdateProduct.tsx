import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { HiMiniSquare3Stack3D } from "react-icons/hi2";
import { MdOutlineHideImage } from 'react-icons/md';
import { SiNamebase } from 'react-icons/si';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { SkeletonLoader } from '../../../components/Loader';
import AdminSideBar from '../../../components/admin/AdminSideBar';
import { useDeleteProductMutation, useProductDetailsQuery, useUpdateProductMutation } from '../../../redux/api/productAPI';
import { RootState } from '../../../redux/store';
import { ErrorAPIResponse } from '../../../types/api.types';
import { responseToast } from '../../../utils/helper';


const Product = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const params = useParams();
  const navigate = useNavigate(); 

  const { data, isLoading, isError, error } = useProductDetailsQuery(params.id!);

  if(isError) {
    const err = (error as ErrorAPIResponse)?.data.message;
    toast.error(err); 
    return <Navigate to={"/404"} />
  }
  const { name, price, stock, description, coverImage } = data?.data || {
    name: "", price: 0, stock: 0, description: ""
  }
  const [nameUpdate, setNameUpdate] = useState<string>(name); 
  const [priceUpdate, setPriceUpdate] = useState<number>(price); 
  const [stockUpdate, setStockUpdate] = useState<number>(stock); 
  const [descriptionUpdate, setDescriptionUpdate] = useState<string>(description!); 
  const [coverImageUpdate, setCoverImageUpdate] = useState<File>(); 
  
  const [updateProduct] = useUpdateProductMutation(); 
  const [deleteProduct] = useDeleteProductMutation(); 

  function changeImageHandler(e: ChangeEvent<HTMLInputElement>){
    const file:File|undefined = e.target.files?.[0];
    const reader:FileReader = new FileReader()

    if(file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if(typeof reader.result === "string") {
          setCoverImageUpdate(file); 
        }
      }; 
    }
  }

  const submitHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const formData = new FormData()
      if(nameUpdate) formData.set("name", nameUpdate)
      if(priceUpdate) formData.set("price", priceUpdate.toString())
      if(stockUpdate) formData.set("stock", stockUpdate.toString())
      if(descriptionUpdate) formData.set("description", descriptionUpdate);
      if(coverImageUpdate) formData.set("coverImage", coverImageUpdate); 

      const res = await updateProduct({userId: user?._id!, formData, productId: data?.data._id!}); 
      responseToast(res, navigate, "/admin/product");
    } catch(error) {
      toast.error(error as string); 
    } 
  }

  const deleteHandler = async() => {
    try{
      const res = await deleteProduct({userId: user?._id!, productId: data?.data._id!})
      responseToast(res, navigate, "/admin/product");
    } catch(error){
      toast.error(error as string)
    }
  }
  
  useEffect(() => {
    if(data) {
      setNameUpdate(data?.data.name)
      setPriceUpdate(data?.data.price)
      setStockUpdate(data?.data.stock)
      setDescriptionUpdate(data?.data.description!)
    }
  }, [data]);

  return (
    <div className="adminContainer">
      <AdminSideBar />
        {isLoading ? <SkeletonLoader length={20}/> : <main className="manageProduct">
          <section>
            <strong>ID: {data?.data._id}</strong>
            <img src={data?.data.coverImage} alt="Product"/>
            <h3>{name}</h3>
            {
              (stock! > 0) ? (<span className="green">{stock} Available</span>) : (<span className="red">Out of Stock</span>)
            }
            <h2>${price}</h2>
          </section>
          <article>
            <button className="product-del-btn" onClick={deleteHandler}>
              <FaTrash/>
            </button>
            <form onSubmit={submitHandler}>
              <h2>Manage</h2>
              <div>
                <span><SiNamebase /></span>
                <input type="text" placeholder='Name' value={nameUpdate} onChange={e => setNameUpdate(e.target.value)}/>
              </div>
              <div>
                <span><SiNamebase /></span>
                <input type="text" placeholder='Description' value={descriptionUpdate} onChange={e => setDescriptionUpdate(e.target.value)}/>
              </div>
              <div>
                <span><FaIndianRupeeSign/></span>
                <input type="number" placeholder='Price' value={priceUpdate} onChange={e => setPriceUpdate(Number(e.target.value))}/>
              </div>
              <div>
                <span><HiMiniSquare3Stack3D /></span>
                <input type="number" placeholder='Stock' value={stockUpdate} onChange={e => setStockUpdate(Number(e.target.value))}/>
              </div>
              <div>
                <span><MdOutlineHideImage/></span>
                <input type="file" accept="image/*" onChange={changeImageHandler}/>
                {<img src={coverImage} id="file-input"/>}
              </div>
              <button type="submit">Update</button>
            </form>
          </article>
        </main>}
    </div>
  )
}

export default Product