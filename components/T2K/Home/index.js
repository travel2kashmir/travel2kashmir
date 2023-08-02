import React, { useState } from 'react'
import Header from '../Header';

function Home({ menu, setMenu }) {
  const [bgImg, setBgImg] = useState('/bg1.jpg')
  let sources = ['/bg1.jpg', '/bg2.jpg', '/bg3.jpg', '/bg4.jpg'];
  setInterval(() => {
    let imgIndex = sources[Math.floor(Math.random() * sources.length)];
    setBgImg(imgIndex)
  }, 20000)


  return (
    <section className='h-screen lg:h-screen bg-gradient-to-r from-blue-100 to-rose-100 border-b-2 lg:flex lg:flex-col'>



      <section className='my-auto'>
        <div className='lg:flex lg:flex-wrap rounded justify-between'>
          <img src={bgImg} className='bgimage relative -z-300'></img>
          
          <div className='absolute inset-0  z-50'>
            <Header
              menu={menu}
              setMenu={setMenu}
              bgColor={'bg-transparent '}
              textColor={'text-gray-100 hover:text-gray-300'}
            />
          </div>


          {/* text on bg image */}
          <div className='absolute bgimage inset-0 z-30 h-screen' >
            <div className='bgt  mx-auto flex home-content lg:flex-none w-4/6 z-10'>
              <div className='px-5 md:px-14 my-auto'>
                <div className="text-center text-white">
                  <h1 className='text-2xl md:text-5xl lg:text-5xl font-semibold pb-10'>Finding the Ideal Property in Kashmir is Simple</h1>
                  <p className='text-base md:text-2xl lg:text-lg text-gray-100 tracking-wide'>With our convenient search, browse extensive real estate listings by category. Locate the ideal partner!</p>
                </div>
              </div>

            </div>
          </div>



        </div>
      </section>


      <style jsx>
        {`
                               
                .bgimage{
                  height:100vh;
                  width:100%;
                }   

                  .home-content {
                    height:100vh
                }
         `}
      </style>
    </section>

  )
}

export default Home;