import React from 'react'
import {Select, SelectItem} from "@nextui-org/react";
//import {animals} from "./data";

const chat = () => {

  const variants = ["flat", "bordered", "underlined", "faded"];

  return (
    <div className="w-full flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Select 
            variant={variant}
            label="Select an animal" 
            className="max-w-xs" 
          >
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            variant={variant}
            label="Favorite Animal"
            placeholder="Select an animal"
            className="max-w-xs"
          >
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      ))}  
    </div> 
  )
}

export default chat

