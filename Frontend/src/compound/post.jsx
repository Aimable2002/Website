import React, { useState, useEffect} from 'react'

import axios from 'axios';
const post = ({post}) => {

  return (
    <div className='grid grid-cols-1'>
        <figure>
            <img src={post.imageURL} alt="" />
        </figure>
    </div>
  )
}

export default post