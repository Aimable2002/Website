const imageSkeleton = () => {
	return(
		<>
            <div className='flex gap-3 items-center'>
				{/* <div className='skeleton w-10 h-10 rounded-full shrink-0'></div> */}
				<div className='skeleton w-60 h-60 rounded'></div>
			</div>

			<div className='flex gap-3 items-center justify-end'>
				<div className='skeleton w-60 h-60 rounded'></div>
				{/* <div className='skeleton w-10 h-10 rounded-full shrink-0'></div> */}
			</div>
        </>
	)
}

export default imageSkeleton

