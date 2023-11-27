'use client'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react'

const typeOfProperty = [
  {
    id:null,
    value: "정렬"
  },
  {
    id:1,
    value: "인기순"
  },
  {
    id:2,
    value: "최신순"
  },
  {
    id:3,
    value: "찜순"
  }
]

function DropDownOption() {

  const router = useRouter();

  const [selectedValue, setSelectedValue] = useState<string>('서비스');

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const selectedValue = typeOfProperty[index].value;
    setSelectedValue(selectedValue);
    console.log('Selected:', selectedValue);
  };

  return (
    <div className=''>
       <div className='p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between'>
      <select onChange={handleSelectChange}>
        {typeOfProperty.map((item) => (
          <option key={item.id} value={item.value}>
            {item.value}
          </option>
        ))}
      </select>
    </div>
    </div>
  )
}

export default DropDownOption