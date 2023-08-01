import React, { useState } from 'react'
import Header from '../Header';

function Home({ menu, setMenu }) {
  const [bgImg, setBgImg] = useState('/bg1.jpg')
  setInterval(() => {
    let sources = ['/bg1.jpg', '/bg2.jpg', '/bg3.jpg','/bg4.jpg'];
    setBgImg(sources[Math.floor(Math.random() * sources.length)])

  }, 10000)
  return (
    <section className='h-screen lg:h-screen bg-gradient-to-r from-blue-100 to-rose-100 border-b-2 lg:flex lg:flex-col'>



      <section className='my-auto'>
        <div className='lg:flex lg:flex-wrap rounded justify-between'>
          <img src={bgImg} className='bgimage relative -z-300'></img>
          <div className='absolute inset-0 w-screen  z-50'>
          <Header
          menu={menu}
          setMenu={setMenu}
          bgColor={'bg-transparent '}
          textColor={'text-gray-100 hover:text-gray-300'}
          />
          </div>
          
          {/* image only visible for lg screen */}
          {/* <div className='hidden  lg:h-96 lg:w-3/12 lg:flex lg:justify-center lg:mt-36 lg:mb-5'>
            <img src={bgImg} className='home-img h-96 lg:rounded-3xl'></img>
          </div> */}

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

          {/* image only visible for lg screen */}
          {/* <div className='hidden lg:block lg:h-96 lg:w-3/12 lg:flex lg:justify-center lg:mt-5'>
            <img src='/chinar2.jpg' className='home-img lg:h-96 lg:rounded-3xl'></img>
          </div> */}

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
                .home-content {
                  height:90vh
              }

              //   @media (max-width: 460px) {
              //     .bgt{
              //       width:100%;
              //       margin-top:28vh;
                                        
              //     }   
              // } 
              //   @media (min-width: 1020px) {
              //     .bgt{
              //       width:60%;
              //       height:100vh;
              //     }   
              // } 

                .bgimage{
                  height:100vh;
                  width:100vw;
                }   
               
                `}
      </style>
    </section>

  )
}

export default Home;