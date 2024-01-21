import ana from '../assets/oneSec.gif';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Button from '@mui/material/Button';

import * as React from 'react';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import CompanyLogos from '../components/Logos';

// Functional component representing the homepage

const useData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch('https://fakestoreapi.com/products', {mode: "cors"})
      .then((res) => {
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        return res.json();
      })
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
      console.log(data)
    }, []);
    
    return { data, error, loading };
}

function Sub() {
    const { enqueueSnackbar } = useSnackbar();  
  
    const handleClickVariant = (variant) => () => {
      // variant could be success, error, warning, info, or default
      if (!document.getElementById('emailInput').value) {
        return;
      }  
      enqueueSnackbar('Signed up!', { variant });
    };
  
    return (
        
      <React.Fragment>
        <Button onClick={handleClickVariant('success')}>Submit</Button>
      </React.Fragment>
    );
  }  

const Home = () => {
    const { data, error, loading } = useData();
    const [showLoading, setShowLoading] = useState(true);
    useEffect(() => {
        // Use setTimeout to set a 3-second delay before setting loading to false
        const timeoutId = setTimeout(() => {
          setShowLoading(false);
        }, 2500);
    
        // Cleanup the timeout to avoid memory leaks
        return () => clearTimeout(timeoutId);
      }, []); 
      useEffect(()=>{
        if (showLoading) {
          document.body.style.overflow = 'hidden';
          document.documentElement.style.overflow = 'hidden';
          return;
        }       
        document.body.style.overflow = '';  // Reset to default
        document.documentElement.style.overflow = '';  // Reset to default
    
      }, [showLoading])
    if (error) return <p className="mt-40">A network error was encountered</p>
    if (loading || showLoading) return  <div className="h-screen">
            <div id='emptyWishlistsBg' className='pt-10 pl-10 pr- text-center text-black rounded-md ml-auto mr-auto'>
                <span className='text-3xl bg-black'>Wait a second. Will you?</span>
                <img src={ana} alt="wait babes" width={650} className='pt-2 mr-auto ml-auto' id='gifStoreLoad' />
            </div>
        </div>
    return (
        <div id="homepage" className='md:ml-auto md:mr-auto'>
            {/* Featured Section */}
            <h1 className='text-4xl font-extrabold text-black w-full p-2 bg-gradient-to-r from-yellow-300 to-white drop-shadow-md'>Featured</h1>
            <section className="featured flex justify-center gap-10 mt-10 p-0 overflow-x-auto sm:p-24">
                <img 
                    src={data[0].image}
                    width={250}
                    alt="bag" 
                 />
                <img 
                    src={data[13].image}
                    width={250}
                    alt="monitor" 
                 />
                <img 
                    src={data[11].image}
                    width={250}
                    alt="hard disk" 
                 />
                    <img 
                    src={data[10].image}
                    width={250}
                    alt="hard disk" 
                 />
                {/* Add your featured content here */}
            </section>
            {/* Top Brands Section */}
            <h1 className='text-4xl font-extrabold text-black w-full p-2 bg-gradient-to-r from-yellow-300 drop-shadow-md to-white mt-5'>Top Brands</h1>
            <section className='sm:p-24'>
              <CompanyLogos />
            </section>
            {/* Sign Up Section */}
            <section className="bg-slate-900 h-40 w-full mt-10 text-white sm:h-72">
                <div className='p-10 font-thin hidden sm:block'>
                  Unlock the best deals and stay ahead of the curve on our latest products! Sign up now to receive exclusive updates, special promotions, and irresistible discounts delivered straight to your inbox. Don't miss out on the opportunity to be the first to know about our newest releases and enjoy fantastic savings. Simply enter your email below and treat yourself to a world of exciting products and unbeatable discounts!
                </div>
                <div className='flex justify-center sm:mt-0'>
                    <input id='emailInput' type="email" placeholder='Your email' className='text-white bg-transparent border mt-12 p-2 w-1/3 sm:mt-0'/>
                    <SnackbarProvider maxSnack={3}>
                        <button id='signupbtn' className='font-thin ml-5 hover:bg-slate-700 p-2 w-1/6 mt-12 sm:mt-0'>
                            <Sub />
                        </button>
                    </SnackbarProvider>                    
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="connect bg-blue-600 h-96 w-full text-white">
                <div className='p-5 text-6xl font-extrabold'>Connect with Us.</div>
                {/* Add your contact information or contact form here */}
                <div className='flex gap-20 items-center justify-center mt-20'>
                    <GitHubIcon className='linkIcons'/>
                    <InstagramIcon className='linkIcons'/>
                    <XIcon className='linkIcons'/>
                    <LinkedInIcon className='linkIcons'/>            
                </div>
            </section>

            {/* Footer Section */}
            <footer>
                {/* Your footer content goes here */}
            </footer>
        </div>
    );
};

export default Home;
