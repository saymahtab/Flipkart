import './App.css';
import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavBar from './components/NavBar';
import MenuItems from './components/MenuItems';
import SlidingImage from './components/SlidingImage';
import ProductList from './components/ProductList';
import ProductTile from './components/ProductTile';
import Advertise from './components/Advertise';
import MiniAdd from './components/MiniAdd';
import Footer from './components/Footer';
import CategoryProducts from './components/category/CategoryProducts';
import ErrorPage from './components/category/ErrorPage';

function App() {
  const [products, setProducts] = useState([]);
  const [moreProducts, setMoreProducts] = useState([])
  const [menClothes, setMenClothes] = useState([]);
  const [womenClothes, setWomenClothes] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [beauty, setBeauty] = useState([]);
  const [fragrances, setFragrances] = useState([]);
  const [furniture, setFurniture] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Cannot fetch products');
        }
        const result = await response.json();
        setProducts(result);
        console.log(result)
      } catch (error) {
        console.error('Network error', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {

      const men = products.filter(product => product.category === "men's clothing" || product.category === 'jewelery');
      const women = products.filter(product => product.category === "women's clothing");
      const electronics = products.filter(product => product.category === 'electronics');

      setMenClothes(men);
      setWomenClothes(women);
      setElectronics(electronics);
    }
  }, [products]);

  useEffect(() => {
    const fetchMoreProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Cannot fetch more products');
        }
        const result = await response.json();
        setMoreProducts(result.products);
        console.log(result)
      } catch (error) {
        console.error('Network error', error);
      }
    };
    fetchMoreProducts();
  }, []);

  useEffect(() => {
    if (moreProducts.length > 0) {

      const beautyProduct = moreProducts.filter(product => product.category === 'beauty');
      const fragranceProduct = moreProducts.filter(product => product.category === 'fragrances');
      const furnitureProduct = moreProducts.filter(product => product.category === 'furniture' || product.category === 'groceries');

      setBeauty(beautyProduct);
      setFragrances(fragranceProduct);
      setFurniture(furnitureProduct);
    }
  }, [moreProducts]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <NavBar products={products} moreProducts={moreProducts}/>
          <MenuItems />
          <SlidingImage />
          <ProductList title="Trending Products" products={menClothes} />

          <div className="add-tile flex">
            <ProductTile title="Suggested For you" products={electronics} idx={0} /> 
            <Advertise />
          </div>

          <div className="tiles flex">
            <ProductTile title="Best Quality" products={womenClothes} idx={0} /> 
            <ProductTile title="Top Selection" products={menClothes} idx={3} /> 
            <ProductTile title="Recomended For You" products={electronics} idx={2} /> 
          </div>

          <div className='flex'>
            <ProductList title="Beauty Products" products={beauty} /><MiniAdd/>
          </div>

          <ProductList title="Other Products" products={furniture} />
          <div className="footer">
            <Footer/>
          </div>
        </>
      )
    },
    {
      path: '/category/:categoryName',
      element: (
      <>
        <NavBar products={products} moreProducts={moreProducts}/>
        <CategoryProducts products={products} moreProducts={moreProducts} />
        <Footer/>
      </>
      ) 
    },
    {
      path: '/category/error',
      element: (
        <>
          <NavBar products={products} moreProducts={moreProducts}/>
          <ErrorPage/>
        </>
      )
    }
  ])

  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
