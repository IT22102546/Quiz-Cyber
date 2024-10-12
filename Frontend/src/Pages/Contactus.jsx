import React from 'react';
import { motion } from 'framer-motion';

export default function ContactUs() {
  return (
    <div
      className='bg-gray-100 flex justify-center items-center p-8'
      style={{
        backgroundImage: "url('https://img.freepik.com/premium-photo/white-background-with-rosemary-thyme-baking-ingredients_1346134-24429.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='bg-blue-200 opacity-60 rounded-lg shadow-lg p-10 w-full max-w-4xl'>
        <motion.h1
          className='text-3xl font-tangerine text-center mb-6 text-gray-800'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>

        <motion.p
          className='text-center text-gray-900 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          We would love to hear from you! Please reach out with any questions, comments, or inquiries.
        </motion.p>

        <motion.div
          className='grid grid-cols-1 gap-6 md:grid-cols-2'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className='flex items-center p-4 bg-blue-100 rounded-lg shadow'>
            <img
              src='https://img.icons8.com/material-outlined/24/000000/phone.png'
              alt='Phone Icon'
              className='mr-4'
            />
            <p className='text-gray-700 text-lg'>+94 123 456 789</p>
          </div>

          <div className='flex items-center p-4 bg-blue-100 rounded-lg shadow'>
            <img
              src='https://img.icons8.com/material-outlined/24/000000/mail.png'
              alt='Email Icon'
              className='mr-4'
            />
            <p className='text-gray-700 text-lg'>info@bioingredientslanka.com</p>
          </div>

          <div className='flex items-center p-4 bg-blue-100 rounded-lg shadow'>
            <img
              src='https://img.icons8.com/material-outlined/24/000000/marker.png'
              alt='Location Icon'
              className='mr-4'
            />
            <p className='text-gray-700 text-lg'>123 Bio Ingredients Lane, Colombo, Sri Lanka</p>
          </div>
        </motion.div>

        <motion.div
          className='mt-10 text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className='text-3xl font-semibold text-green-600'>Follow Us</h2>
          <div className='flex justify-center space-x-6 mt-4'>
            <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
              <img
                src='https://img.icons8.com/material-outlined/24/000000/facebook-new.png'
                alt='Facebook Icon'
              />
            </a>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
              <img
                src='https://img.icons8.com/material-outlined/24/000000/twitter.png'
                alt='Twitter Icon'
              />
            </a>
            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
              <img
                src='https://img.icons8.com/material-outlined/24/000000/instagram-new.png'
                alt='Instagram Icon'
              />
            </a>
          </div>
        </motion.div>

        <motion.div
          className='mt-8 text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className='text-gray-600 text-lg'>
            For more information or inquiries, please don't hesitate to contact us. We’re here to help!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
