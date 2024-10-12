import React from 'react';
import { motion } from 'framer-motion';

export default function Company() {
  return (
    <div
      className='min-h-screen bg-gray-100 flex justify-center items-center p-8'
      style={{
        backgroundImage: "url('https://media.istockphoto.com/id/1203733319/photo/natural-drug-research-natural-organic-and-scientific-extraction-in-glassware-alternative.jpg?s=612x612&w=0&k=20&c=dh62LrUUgXJmeuu6I5KQZhbETmxjW0E1bvAoqktB08U=')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='pl-5 flex space-x-4 w-full max-w-5xl gap-1 rounded-xl'>
        <motion.div
          className='bg-green-200 flex-1 p-4 rounded-md shadow-md bg-opacity-60'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className='text-center text-3xl text-green-950 font-cinzel pb-6'>About Us</h1>
          <p>
            Bio Ingredients Lanka (Pvt) Ltd focuses on providing sustainable,
            high-quality bio-based ingredients for global markets. Committed to
            eco-friendly solutions, the company prioritizes quality, transparency,
            and environmental responsibility, aiming to build lasting partnerships
            and positively impact both the environment and the communities it serves.
          </p>
        </motion.div>
        <motion.div
          className='bg-blue-300 flex-1 p-4 rounded-md shadow-md bg-opacity-60'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className='text-center text-3xl text-blue-800 font-cinzel pb-6'>Our Strength</h1>
          <p>
            We operate with world reputed manufacturers/suppliers with technical
            support and product stewardship.
          </p>
        </motion.div>
        <motion.div
          className='bg-yellow-200 flex-1 p-4 rounded-md shadow-md bg-opacity-60'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className='text-center text-3xl text-yellow-600 font-cinzel pb-6'>Our Service</h1>
          <p>
            We provide all types of solutions in R&D, Technical, Machineries,
            Canning, and Certifications…etc.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
