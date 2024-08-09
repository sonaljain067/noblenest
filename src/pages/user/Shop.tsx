import { useState } from "react";
import { toast } from "react-hot-toast";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { SkeletonLoader } from "../../components/Loader";
import Rating from "../../components/Rating";
import ProductItem from "../../components/user/ProductItem";
import { useCategoriesQuery, useSubCategoriesQuery, } from "../../redux/api/categoryAPI";
import { useFetchProductsQuery, useSearchProductsQuery } from "../../redux/api/productAPI";
import { addToCart } from "../../redux/reducer/cartReducer";
import { RootState } from "../../redux/store";
import { ErrorAPIResponse } from "../../types/api.types";
import { OrderItem, Product } from "../../types/base.types";

const Shop = () => {
  const { selCategory } = useSelector((state: RootState) => state.productReducer);  
  const [ search, setSearch ] = useState("");
  const [ sort, setSort ] = useState(""); 
  const [ maxPrice, setMaxPrice] = useState(100000); 
  const [ category, setCategory ] = useState(selCategory); 
  const [ subCategory, setSubCategory ] = useState(""); 
  const [page, _] = useState(1);

  const dispatch = useDispatch(); 

  const { data: categoriesResponse, isError: isErrorCategories, error: categoryError, isLoading: categoryLoading } = useCategoriesQuery("");
  const { data: subcategoriesResponse, isError: isErrorSubCategories, error: subcategoryError, isLoading: subcategoryLoading } = useSubCategoriesQuery("");
  const { data: products, isLoading: productsLoading } = useFetchProductsQuery("");
  const {data: searchedProduct, isLoading: productLoading, isError: isErrorSearchProducts, error: searchProductsError } = useSearchProductsQuery({search, sort, price: maxPrice, category, page, subCategory}); 

  const popularData = products?.data.products.slice(0,3)
  if(isErrorCategories) {
    const err = (categoryError as ErrorAPIResponse)?.data.message
    if(err) toast.error(err);  
    else {
        console.log(categoryError)
        toast.error("Internal Server Error!!")
    }
  }
  if(isErrorSubCategories) {
    const err = (subcategoryError as ErrorAPIResponse)?.data.message
    if(err) toast.error(err);  
    else {
        console.log(subcategoryError)
        toast.error("Internal Server Error!!")
    }
  }

  if(isErrorSearchProducts){
    const err = (searchProductsError as ErrorAPIResponse)?.data.message
    if(err) toast.error(err);  
    else {
        console.log(searchProductsError)
        toast.error("Internal Server Error!!")
    } 
  }

  const addToCartHandler = (cartItem: OrderItem) => {
    if(cartItem.product.stock < 1) return toast.error("Out of Stock!"); 
    dispatch(addToCart({order: cartItem, flag: true})); 
    toast.success("Added to Cart!")
}
  
  return (
    <div className="shop">
      <h3>Home / <span className="blue">Products</span></h3>
      <div className="shopContainer">
        <aside className="shopProductsWithPriceAndCategoriesFilter">
          <div className="productFilterByPrice">
            <h3>Filter by Price</h3>
              <h4>Max Price: { maxPrice || "" } </h4>
                <input type="range" min={100} max={100000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
          </div>
          <div className="productSort">
            <h4>Sort</h4>
            <select name="" id="" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">None</option>
              <option value="asc">Price - Low to High</option>
              <option value="desc">Price - High to Low</option>
            </select>
          </div>
          <div className="sortOption">
            <h4>Category Filter</h4>
              <select name="" id="" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All</option>
                {!categoryLoading && categoriesResponse?.data.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
              </select>
              <h4>Sub Category Filter</h4>
              <select name="" id="" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                <option value="">All</option>
                {!subcategoryLoading && subcategoriesResponse?.data.map((subcategory: any) => (
                <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
              ))}
              </select>
          </div>
            
          <div className="popularProducts">
              <h3>Popular Products</h3>
              {productsLoading ? <SkeletonLoader length={15}/>:
                popularData && popularData.map(product => (
                  <div className="popularProduct">
                    <img src={product.coverImage} alt="" />
                    <div className="popularProductInfo">
                      <p className="productName">{product.name}</p>
                      <p className="productPrice">${product.price}.00</p>
                      <div className="productRating">
                        <Rating rating={4}/>
                      </div>
                    </div>
                  </div>
               ))}
          </div>
        </aside>
        <section className="shopCategoryProducts">
          <div className="productSearch">
            <h2>Products</h2>
              <p>
                <input type="text" placeholder="Search" onChange = {(e) => setSearch(e.target.value)} name="" id="" />
                <span><IoIosSearch/></span>
              </p>
          </div>
          <div className="actions">
            <div className="options">
            </div>
            <div className="pagination">
              {searchedProduct && searchedProduct?.data.totalPages > 1 && <div className="pagination">1 out of {searchedProduct?.data.totalPages}</div>}
            </div>
          </div>
          <div className="products">
            {productLoading ? <SkeletonLoader length={15}/>:
              searchedProduct?.data.products && searchedProduct?.data.products.map((product: Product) => (
                <ProductItem _id={product._id} name={product.name} rating={5} price={product.price} 
                stock={product.stock} coverImage={product.coverImage} handler={() => addToCartHandler({ quantity: 1, product: {_id: product._id, stock: product.stock, name: product.name, price: product.price, coverImage: product.coverImage} })}
              /> 
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Shop