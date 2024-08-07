import { FormEvent, useEffect, useState } from 'react';
import AdminSideBar from '../../../components/admin/AdminSideBar';

const allLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const allNumbers = "1234567890";
const allSymbols = "`~!@#$%^&*()-_=+[]{}\|;:',<>/<>?";


const Coupons = () => {
  const [ size, setSize ] = useState<number>(8);
  const [ prefix, setPrefix ] = useState<string>("");
  const [ includeNumbers, setIncludeNumbers ] = useState<boolean>(false);
  const [ includeSymbols, setIncludeSymbols ] = useState<boolean>(false);
  const [ includeCharacters, setIncludeCharacters ] = useState<boolean>(false);
  const [ isCopied, setIsCopied ] = useState<boolean>(false); 
  const [ coupon, setCoupon ] = useState<string>(""); 

  const copyText = async(coupon: string) => {
    await window.navigator.clipboard.writeText(coupon); 
    setIsCopied(true); 
  }
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!includeCharacters && !includeNumbers && !includeSymbols) {
      alert("Please select one atleast!");
    }  
    let result: string = prefix || "";
    const couponLength: number = size - result.length; 
    for(let i = 0; i < couponLength; i++) {
      let entireString: string = ""; 
      if(includeCharacters) entireString += allLetters;
      if(includeNumbers) entireString += allNumbers; 
      if(includeSymbols) entireString += allSymbols; 

      const randomNumber: number = ~~(Math.random()*entireString.length);
      result += entireString[randomNumber]
    }
    setCoupon(result);
  }

  useEffect(() => {
    setIsCopied(false); 
  }, [coupon]); 

  return (
    <div className="adminContainer">
      <AdminSideBar />
      <main className="couponContainer">
        <form className="couponForm" onSubmit={submitHandler}>
          <input type="text" name="Coupon" placeholder="Text to include" 
          value = {prefix} onChange={e => setPrefix(e.target.value)} 
          maxLength={size} />
          <input type="number" name="Coupon" placeholder="Coupon Length" 
          value = {size} onChange={e => setSize(Number(e.target.value))} 
          min={8} max={25} />
          <fieldset>
            <legend>Includes</legend>
            <input type="checkbox" name="Numbers" 
            checked={includeNumbers} onChange={() => setIncludeNumbers(prev => !prev)} />
            <span>Numbers</span>

            <input type="checkbox" name="Numbers" 
            checked={includeCharacters} onChange={() => setIncludeCharacters(prev => !prev)} />
            <span>Characters</span>

            <input type="checkbox" name="Numbers" 
            checked={includeSymbols} onChange={() => setIncludeSymbols(prev => !prev)} />
            <span>Symbols</span>
          </fieldset>
          <button type="submit">Generate</button>
          
        </form>
        {
          coupon &&
            (
            <code>
              {coupon}
              <span onClick={() => copyText(coupon)}>{ isCopied ? "Copied": "Copy" }</span>
            </code> 
          )
        }
      </main>
    </div>
  )
}

export default Coupons