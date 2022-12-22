import React, { useEffect } from 'react'
import { useStateValue } from '../context/contextProvider';
import { actionType } from '../context/reducer';
import { getAllPayments } from '../utils.js/firebasefunctions';
import { OrderCard } from './Cards';

const DashboardOrder = () => {
  const [{paymentdetails}, dispatch] = useStateValue();

  useEffect(() => {
    if (!paymentdetails) {
      getAllPayments().then((data)=>{
        dispatch({
          type: actionType.SET_PAYMENT_DETAIL,
          paymentdetails: data,
         })
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      {/*filter*/}

      {/*tabular data form*/}
      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3 bg-white">
        {/*table count for user*/}
        <div className="absolute top-4 left-4">
          <p className="text-sm font-semibold">
            Count :
            <span className="text-xl font-bold text-textColor">
              {paymentdetails?.length}
            </span>
          </p>
        </div>
        {/*table heading*/}
        <div className="w-full min-w-[750px] flex items-center justify-between">
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            ID
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Name
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Address
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Number
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Location
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Created
          </p>
        </div>
        {/*table content*/}
        {
          paymentdetails && (
            paymentdetails.map((data,idx)=>(
              <OrderCard data={data} idx={idx} />
              
            ))
          )
        }
      </div>
    </div>
  )
}

export default DashboardOrder