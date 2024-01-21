// AboutPage.jsx

import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-pink-600">About Our Shopping Cart App</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="mb-4 p-3 pt-40 pb-40 w-max lg:pr-32 rounded-lg lg:pl-32 text-5xl bg-black">
          <span className='text-red-500'>Web</span><span className='text-white text-2xl'>Nymph</span>
          </div>

          <div>
            <p className="text-lg leading-relaxed mb-4">
              Welcome to our shopping cart app, where your shopping experience meets
              convenience and style. Our goal is to provide you with a seamless and
              enjoyable shopping journey.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Explore our wide range of products, from the latest fashion trends to
              cutting-edge electronics. With our user-friendly interface, secure
              transactions, and speedy delivery, we aim to make your shopping experience
              delightful.
            </p>
            <p className="text-lg leading-relaxed">
              Join us on this exciting adventure, and let's redefine the way you shop
              online. Thank you for choosing our shopping cart app!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
