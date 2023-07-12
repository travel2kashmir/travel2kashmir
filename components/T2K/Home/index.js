import React from 'react'
import Header from '../Header';

function Home({ menu, setMenu }) {
  return (
    <section className='h-screen lg:h-screen bg-gradient-to-r from-blue-100 to-rose-100 border-b-2 lg:flex lg:flex-col'>

      <Header
        menu={menu}
        setMenu={setMenu}
      />

      <section className='my-auto'>
        <div className='lg:flex lg:flex-wrap rounded justify-between'>

          {/* image only visible for lg screen */}
          <div className='hidden lg:block lg:h-96 lg:w-3/12 lg:flex lg:justify-center lg:mt-36 lg:mb-5'>
            <img src='/winter1.jpg' className='home-img h-96 lg:rounded-3xl'></img>
          </div>

          <div className='home-content flex lg:flex-none lg:w-6/12 z-10'>
            <div className='px-5 md:px-14 my-auto'>
              <div className="text-center">
                <h1 className='text-3xl md:text-5xl lg:text-4xl font-semibold pb-10' style={{ color: '#2912d3' }}>Finding the Ideal Property in Kashmir is Simple</h1>
                <p className='text-base md:text-2xl lg:text-lg text-gray-500 tracking-wide'>With our convenient search, browse extensive real estate listings by category. Locate the ideal partner!</p>
              </div>
            </div>

          </div>

          {/* image only visible for lg screen */}
          <div className='hidden lg:block lg:h-96 lg:w-3/12 lg:flex lg:justify-center lg:mt-5'>
            <img src='/chinar2.jpg' className='home-img lg:h-96 lg:rounded-3xl'></img>
          </div>

        </div>
      </section>


      <style jsx>
        {`
        @media  (max-width:1020px) {
                    .home-content {
                        height:90vh
                    }
                }   
                @media (min-width: 1020px) and (max-width:1280px) {
                    .home-img {
                        height:300px
                    }
                }    
                @media (min-width: 1280px) {
                    .home-img {
                        height:400px
                    }
                }    
                `}
      </style>
    </section>

  )
}

export default Home;