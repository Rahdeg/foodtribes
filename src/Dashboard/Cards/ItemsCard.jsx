import React from 'react'
import {motion} from 'framer-motion'
import Notfound from '../../img/NotFound.svg'
import { MdDelete } from 'react-icons/md'


const ItemsCard = ({data}) => {
  
  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
    {
        data && data.length >0 ? data.map((item,idx)=>(
            <div
            key={idx}
             className="w-300 min-w-[300px] md:min-w-[340px] md:w-350 h-auto bg-cardOverlay backdrop-blur-lg my-12 p-2 hover:drop-shadow-lg cursor-pointer rounded-md flex flex-col items-center justify-between">
            
            <div className="w-full flex items-center justify-between ">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={item.imageUrl}
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                alt="ice"
              />
        <motion.div 
        whileTap={{scale:0.75}}
        className="w-8 h-8  rounded-md flex items-center justify-center bg-gray-200"
        >
        <MdDelete className=" text-xl text-red-400 hover:text-red-500"/>
        </motion.div>
            </div>
            <div className="w-full flex flex-col items-end justify-end">
              <p className=" text-textColor text-base  font-semibold md:text-lg">
               {item.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">{item?.calories}</p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className=" text-sm text-red-500">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
          )):<div
          className="w-full flex  flex-col items-center justify-center">
          <img src={Notfound} alt="nn" className=" h-[350px] my-2"/>
          <p className="text-xl text-textColor font-semibold">Items Not available at the moment</p>
          </div>
    }
</div>
  )
}

export default ItemsCard