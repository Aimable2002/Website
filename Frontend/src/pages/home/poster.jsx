import React from 'react'
//import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const poster = () => {
  return (
    <div className='w-full flex flex-row'>
        <div className='flex relative w-full'>
            <div className='static w-full flex flex-row'>
                <div style={{width: 'calc(100% - 70%)'}}>application</div>
                <div className='flex flex-row bg-slate-500 justify-around' style={{width: 'calc(100% - 30%)'}}>
                    <div>icon1</div>
                    <div>icon2</div>
                    <div>icon3</div>
                    <div>icon4</div>
                </div>
            </div>
        </div>
        <div></div>
    </div>
  )
}

export default poster