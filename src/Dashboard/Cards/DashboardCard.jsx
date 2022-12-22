import React from 'react'
import { bgColors } from '../../utils.js/styles';

const DashboardCard = ({ icon, name, count,idx }) => {
    const bgColor = bgColors[parseInt(Math.random() * bgColors.length)];

  return (
    <div
      style={{ background: `${bgColor}` }}
      className="p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-blue-500 flex flex-col items-center justify-center"
      key={idx}
      >

      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-xl text-textColor">{count}</p>
    </div>
  )
}

export default DashboardCard