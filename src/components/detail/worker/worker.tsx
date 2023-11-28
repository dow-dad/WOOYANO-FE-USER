import Avatar from '@/shared/Avatar'
import { WorkerDataType } from '@/types/house-keeper-detail/workerData'
import React, { SetStateAction } from 'react'
import { FaStar } from 'react-icons/fa'

function Worker({setOnClickData,data}:{setOnClickData:React.Dispatch<SetStateAction<any>>,data:WorkerDataType}) {
  
  return (
    <div onClick={()=>{setOnClickData({
      workername:data.name,
      desc:data.description,
      workerId:data.workerId,
      workerImg:data.imgUrl
    })}} className='py-5'>
      <div className="flex items-center">
        <Avatar
          // hasChecked
          // hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
          imgUrl={data.imgUrl}
          sizeClass="h-14 w-14"
          radius="rounded-xl"
        />
        <div className='ml-3'>
          <a className="flex  text-xl text-black font-medium" href="##">
            {data.name}
            <p className='flex items-center text-sm text-gray-500'>
              
            </p>
          </a>
          
        </div>
        {/* desc */}
        <span className="block text-neutral-6000 dark:text-neutral-300 mt-5 ml-10">
          {data.description}
        </span>
      </div>

      
    </div>
  )
}

export default Worker