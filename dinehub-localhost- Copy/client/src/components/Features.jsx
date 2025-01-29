import React from 'react'

const Features = () => {
    return (
        <div>
            <h1 className="dark:text-gray-300 flex flex-wrap justify-center font-extrabold text-3xl heading md:mb-12 mt-12 mb-8">Services</h1>


            <div className='sm:flex m-2 sm:flex-wrap gap-4 sm:justify-center'>
                <div className="stats  w-full sm:w-80 sm:h-40 justify-center  rounded-md shadow-gray-300 shadow-md sm:shadow-lg">

                    <div className="stats mx-2 my-4  rounded-none  ">
                        <div className="stat-title">Total Page Views</div>
                        <div className="stat-value text-orange-500 border-none">89,400</div>
                        <div className="stat-desc border-none">21% more than last month</div>
                    </div>

                </div>
                <div className="stats  my-4 sm:my-0 rounded-md  w-full  sm:w-80 sm:h-40 shadow-gray-300 shadow-md justify-center sm:shadow-lg">

                    <div className="stats rounded-none">
                        <div className="stat-title">Total Likes</div>
                        <div className="stat-value text-pink-500 border-none">25.6K</div>
                        <div className="stat-desc border-none">21% more than last month</div>
                    </div>

                </div>
                <div className="stats  w-full  sm:w-80 sm:h-40 rounded-md shadow-gray-300 shadow-md sm:shadow-lg">

                    <div className="stat flex flex-col flex-wrap justify-center items-center gap-4 m-0 p-2 rounded-none sm:flex sm:flex-wrap sm:flex-row">
                        <div className=' flex flex-wrap justify-center items-center flex-col '>
                            <div className="stat-title">Tasks done</div>
                            <div className="stat-value text-red-600  sm:mt-4 sm:mb-4">86%</div>
                            <div className="stat-desc ">21% more than last month</div>
                        </div>
                        <div className='flex flex-wrap justify-center items-center '>
                            <div className="avatar ">
                                <div className="w-14 sm:w-20 rounded-full">
                                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            {/* <div className='flex flex-wrap justify-center gap-4 px-4 sm:px-8'>
            <div className="card card-side bg-base-100 shadow-xl h-60 ">
                <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Fast & Free Delivery</h2>
                    <p>Click the button to watch on Jetflix app.</p>
                    
                </div>
            </div>

            <div className="card card-side bg-base-100 shadow-xl  h-60">
                <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Easy to Buy</h2>
                    <p>Click the button to watch on Jetflix app.</p>
                    
                </div>
            </div>

            <div className="card card-side bg-base-100 shadow-xl  h-60">
                <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
                <div className="card-body">
                    <h2 className="card-title">New movie is released!</h2>
                    <p>Click the button to watch on Jetflix app.</p>
                    
                </div>
            </div>

            <div className="card card-side bg-base-100 shadow-xl h-60">
                <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
                <div className="card-body">
                    <h2 className="card-title">New movie is released!</h2>
                    <p>Click the button to watch on Jetflix app.</p>
                   
                </div>
            </div>
        </div> */}
        </div>
    )
}

export default Features
