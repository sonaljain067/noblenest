import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { HiMiniSquare3Stack3D, HiPhoto } from "react-icons/hi2";
import { SiNamebase } from 'react-icons/si';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminSideBar from '../../../components/admin/AdminSideBar';
import { useCreateProductMutation } from '../../../redux/api/productAPI';
import { RootState } from '../../../redux/store';
import { responseToast } from '../../../utils/helper';

const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [ name, setName ] = useState<string>("");
  const [ description, setDescription ] = useState<string>("");
  const [ price, setPrice ] = useState<number>();
  const [ stock, setStock ] = useState<number>(1);
  const [ photoPrev, setPhotoPrev ] = useState<string>("");
  const [ photo, setPhoto ] = useState<File>();
  const [subcategory, setSubcategory] = useState<string>("");

  const navigate = useNavigate();
  const [createProduct] = useCreateProductMutation();

  function changeImageHandler(e: ChangeEvent<HTMLInputElement>){
    const file:File|undefined = e.target.files?.[0];
    const reader:FileReader = new FileReader()

    if(file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if(typeof reader.result === "string") {
          setPhotoPrev(reader.result)
          setPhoto(file);
        }
      }; 
    }
  }

  const submitHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      if(!name || !price || !subcategory || (!stock && stock <= 0) || !photo || !description) return;
    
      const formData = new FormData()
      formData.set("name", name)
      formData.set("price", price.toString())
      formData.set("subcategory", subcategory)
      formData.set("stock", stock.toString())
      formData.set("description", description);
      formData.set("coverImage", photo)

      const res = await createProduct({id: user?._id!, formData}); 
      responseToast(res, navigate, "/admin/product");
    } catch(error) {
      toast.error(error as string); 
    } 
  }

  return (
    <div className="adminContainer">
      <AdminSideBar />
        <main className="createNewProduct">
          <article>
            <form onSubmit={submitHandler}>
              <h2>New Product</h2>
              <div>
                <span><SiNamebase /></span>
                <input required type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)}/>
              </div>
              <div>
                <span><HiMiniSquare3Stack3D /></span>
                <input required type="text" placeholder='Description' value={description} onChange={e => setDescription(e.target.value)}/>
              </div>
              <div>
                <span><FaIndianRupeeSign/></span>
                <input required type="number" placeholder='Price' value={price} onChange={e => setPrice(Number(e.target.value))}/>
              </div>
              <div>
                <span><HiMiniSquare3Stack3D /></span>
                <input required type="number" placeholder='Stock' value={stock} onChange={e => setStock(Number(e.target.value))}/>
              </div>
              <div>
                <span><HiMiniSquare3Stack3D /></span>
                <input required type="string" placeholder='Eg. Laptop, Camera, etc.' value={subcategory} onChange={e => setSubcategory(e.target.value)}/>
              </div>
              <div>
                <span><HiPhoto /></span>
                <input required type="file" accept="/image/*" placeholder='Cover Image' onChange={ changeImageHandler }/>
              </div>
              {
                photoPrev && <img src={photoPrev} alt = "New Image" />
              }
              <button type="submit">Create</button>
            </form>
          </article>
        </main>
    </div>
  )
}

export default NewProduct