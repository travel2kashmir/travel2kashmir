import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Router from 'next/router';
import Data from '../Data';
import Link from 'next/link';


function Header({bgColor='bg-slate-100',textColor='text-gray-700 hover:text-blue-600', menu, setMenu,borderLine=false}) {

  return (
    <section className={bgColor}>
      <div className={`py-3 lg:py-5 px-2 lg:px-5 ${borderLine===true?`border-b-2`:`border-none`} flex justify-between`}>
        {/* mobile view  and tablet view */}
        <>
        <img src='/t2k.png' className='h-12 md:h-16 lg:hidden'></img>
        <h2 className='lg:hidden font-medium text-xl md:text-3xl my-auto text-white'>Travel2Kashmir</h2>
        
        <div className='flex justify-center items-center'>{menu === true ? <i className='lg:hidden' onClick={() => setMenu(!menu) }>
          <CloseIcon fontSize='large' sx={{color:'white'}}/></i> :
        <i className='lg:hidden' onClick={() => setMenu(!menu) }><MenuIcon fontSize='large' sx={{color:'white'}} /></i>}</div>
        </>

        {/* desktop view */}
        <div className='hidden lg:flex cursor-pointer '>
          <img className='h-20' onClick={() => Router.push(window.location.origin)} src='/t2k.png' />
        </div>
        
        <ul className='hidden  lg:mr-20 lg:justify-end lg:flex lg:gap-10 lg:my-auto lg:ml-auto '>
          <li className={`font-medium ${textColor}  cursor-pointer`}><Link href='/'>Home</Link></li>
          <li className={`font-medium ${textColor}  cursor-pointer`} onClick={() => document.getElementById('sublist').className === 'hidden' ? document.getElementById('sublist').className = 'block absolute bg-slate-100  py-4 px-5 w-36 text-left rounded-b-3xl' : document.getElementById('sublist').className = 'hidden'}>
          <span >Places</span>
            <ul id='sublist' className='hidden'>
              {Data.map((place,index) => {
                return (
                  <li key={index} 
                  onClick={
                    //local storage mei save krna hai place{name ,placeid}
                    // redirect to place page
                    ()=>{
                      localStorage.setItem("place",place.name),
                      console.log("pushing")
                      Router.push(`${window.location.origin}/place?p=${place.name}`)
                    }
                  }
                  className={`pb-2 border-b border-black capitalize font-medium pt-2 text-black/70 hover:text-black cursor-pointer`}>{place?.name}</li>
                )
              })}
            </ul>
          </li>
          <li className={`font-medium ${textColor}  cursor-pointer`} onClick={()=>{Router.push(`${window.location.origin}/#location`)}}>Properties</li>
          <li className={`font-medium ${textColor}  cursor-pointer`}><Link href='/aboutus'>About us</Link></li>
         
        </ul>
      </div>
    </section>
  )
}

export default Header