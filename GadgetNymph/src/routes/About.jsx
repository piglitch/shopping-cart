// AboutPage.jsx

import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-800 min-h-screen">
      
      <div className="container mx-auto p-8">
        <h1 className="text-6xl font-bold mb-6 text-pink-600">About Our Shopping Cart App.</h1>

        <div className='flex flex-col justify-between lg:flex-row md:pt-5 lg:items-center'>
          <div className="mb-4 p-3 h-max pt-40 pb-40 w-full text-center sm:pr-32 rounded-lg sm:pl-32 text-5xl bg-black">
          <span className='text-red-500'>Web</span><span className='text-white text-2xl'>Nymph</span>
          </div>

          <div className='border-l-2 pl-2 font-extralight'>
            <p className="text-lg leading-relaxed mb-4">
              <span className="text-red-500">Web</span>
              <span className="text-white">Nymph</span> is a dynamic shopping cart application that brings together the latest web technologies to provide a delightful user experience. 
              <br />
              <strong className='underline'>
                Note: <span className="text-red-500">Web</span>
                <span className="text-white">Nymph</span> is a Frontend Project and is not meant to be used commercially; the items shown in the website are just a bunch of dummy data fetched from <a href="https://fakestoreapi.com/" target="_blank" rel="noopener noreferrer" className='text-blue-600'>Fake Store API</a>.
              </strong>
            </p>
            <p className="text-lg leading-relaxed mb-4">
              The frontend of <span className="text-red-500">Web</span>
              <span className="text-white">Nymph</span> is built using <strong className="text-yellow-400">React.js</strong>, a powerful and declarative JavaScript library. It employs <strong className="text-yellow-400">React PropTypes</strong> for type-checking to ensure robust code and a smoother development process. The styling is achieved with <strong className="text-yellow-400">Tailwind CSS</strong> and <strong className="text-yellow-400">SCSS</strong> as a postprocessor, offering a scalable and maintainable styling solution.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              To enhance the user interface, the project utilizes components and icons from <strong className="text-yellow-400">Material-UI (MUI)</strong>. The build process is streamlined with <strong className="text-yellow-400">Vite</strong> as the build tool, providing fast and efficient development and production builds.
            </p>
            <p className="text-lg leading-relaxed">
              The deployment of <span className="text-red-500">Web</span>
              <span className="text-white">Nymph</span> is handled seamlessly by <strong className="text-yellow-400">Vercel</strong>, ensuring that the application is easily accessible to users. This project demonstrates a commitment to staying current with modern web development practices and technologies, making <span className="text-red-500">Web</span>
              <span className="text-white">Nymph</span> a standout addition to my portfolio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
