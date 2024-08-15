import React, {useState} from 'react';
import { BsCart3, BsShopWindow } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavBar = ({products, moreProducts}) => {
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState('')

    const handleChange = (e) => {
        setSearchText(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const flag = products.some(product => {
            if(product.category.includes(searchText)){
                setSearchText(product.category)
                navigate(`/category/${product.category}`)
                return true;
            } 
        })
        const flag1 = moreProducts.some(product => {
            if(product.category.includes(searchText)){
                setSearchText(product.category)
                navigate(`/category/${product.category}`)
                return true;
            } 
        })
        if(!flag && !flag1) navigate(`/category/error`)
        
    }

    return (
        <header className='bg-blue-500 p-1 fixed w-full z-10 top-0'>
            <div className='flex justify-between items-center px-4 py-1'>
                <div className='flex items-center w-full'>
                    <div className="nav-logo p-2 flex-shrink-0 ml-20 cursor-pointer">
                        <Link to={`/`} >
                            <img 
                                src="/flipkart.png" 
                                alt="Flipkart Logo"
                                className='w-[100px] h-[40px] object-contain'
                            />
                        </Link>
                    </div>
                    <div className="nav-search-box relative flex-1 max-md:hidden ml-5">
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="search"
                                placeholder='Search for Products, Brands and More'
                                className='w-full h-10 rounded-md pl-12 text-md outline-none'
                                onChange={handleChange}
                                value={searchText}
                            />
                            <div className="search-icon">
                                <img 
                                    src="/search-icon.png" 
                                    alt="search-icon" 
                                    className='h-5 absolute top-0 ml-3 mt-2 opacity-80'
                                />
                            </div>
                            <button type='submit' style={{display: 'none'}}></button>
                        </form>
                    </div>
                </div>
                <div className="nav-buttons flex justify-evenly items-center text-white ml-10">
                    <div className="nav-cart flex items-center cursor-pointer">
                        <CgProfile size={22}/>
                        <p className='p-3 text-lg font-medium'>Login</p>
                    </div>
                    <div className="nav-login-button ml-10 flex items-center cursor-pointer">
                        <BsCart3 size={22} />
                        <p className='p-2 text-lg font-medium'>Cart</p>
                    </div>
                    <div className="nav-login-button ml-10 flex items-center cursor-pointer w-60">
                        <BsShopWindow size={22}/>
                        <p className='p-2 text-lg font-medium'>Become a Seller</p>
                    </div>
                </div>
            </div>
        </header>
      );
}

export default NavBar;
