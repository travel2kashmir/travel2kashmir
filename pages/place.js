import Header from '@/components/T2K/Header'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Carousel from 'better-react-carousel';
import PropertyCard from '@/components/T2K/Cards/PropertyCard';
import Footer from '@/components/T2K/Footer';
import BookingForm from '@/components/T2K/utils/BookingForm';
import Loader from '@/components/T2K/Loaders/Loader';
import MenuSM from '@/components/T2K/MenuSM';
import Modal from '@/components/T2K/Modals/Modal';
import Data from '../components/T2K/Data';
// import srinagar from "../components/T2K/Data/Srinagar.json"



function place() {
    SwiperCore.use([Navigation, Pagination, Autoplay]);

    const [place, setPlace] = useState();
    const [placeDetail, setPlaceDetail] = useState([]);
    const [seasonDetail, setSeasonDetail] = useState([]);
    const [location, setLocation] = useState([]);

    const [allFullProperties, setAllFullProperties] = useState([]);
    const [showUI, setShowUI] = useState(0);
    const [onlyBasicDetails, setOnlyBasicDetails] = useState([]);
    const [allCities, setAllCities] = useState(['city']);
    const [selectedCity, setSelectedCity] = useState()
    const [hotelRoomPrice, setHotelRoomPrice] = useState({})

    // loaders
    const [seasonLoader, setSeasonLoader] = useState(0);
    const [placeDetailLoader, setPlaceDetailLoader] = useState(0);
    const [hotelDetailLoader, setHotelDetailLoader] = useState(0);
    const [weatherDetailLoader, setWeatherDetailLoader] = useState(0);

    const [empty, setEmpty] = useState(false)
    const [attractionEmpty, setAttractionEmpty] = useState(false)
    const [cat, setCat] = useState([])

    const weatherTemperature = location?.main?.temp;
    const weatherIcon = location?.weather?.[0]?.icon;
    const imageURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

    const router = useRouter();
    const { query } = router;

    // set menu for small screen
    const [menu, setMenu] = useState(false);

    // set bookingmodel for small and medium screen
    const [showModalBooking, setShowModalBooking] = useState(0);

    useEffect(() => {
        let place_name = localStorage.getItem("place")
        setPlace(place_name);
        fetchAllPlaceDetails(place_name)

        getWeather(place_name);
        fetchAllProperties(place_name)
    }, [query])

    // getWeather function is used to get the weather from the openweather api.
    function getWeather(name) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=62779ab6389dbe138a06a5f268fee0d2&units=metric`
        axios.get(url).then((response) => {
            console.log(response)
            setLocation(response.data)
            setWeatherDetailLoader(1)
        }).catch((err) => {
            // alert(JSON.stringify(err))
        })
    }

    function fetchAllPlaceDetails(name) {

        for (let placeName in Data) {
            if (Data[placeName].name === name) {
                setPlaceDetail(Data[placeName])
                setSeasonDetail(Data[placeName].seasons)
                setPlaceDetailLoader(1)
                setSeasonLoader(1);
                manageCat(Data[placeName].categories)

                break
            }
        }
    }

    function room_price(all_property) {
        let property_id = all_property.property_id;
        let temp_rates = [];

        if (Object.keys(all_property).includes('rooms') === false) {
            return ({
                property_id, price: 0, currency: 'none'
            })
        }

        all_property.rooms.map(room => {

            if (Object.keys(room).includes("unconditional_rates") === false) {
                temp_rates.push({
                    property_id, price: 0, currency: "none"
                })
            }
            else {
                temp_rates.push({
                    property_id, "price": room.unconditional_rates[0].baserate_amount,
                    "currency": room.unconditional_rates[0].baserate_currency
                })
            }
        })

        if (temp_rates.length === 0 || temp_rates.length === 1) {
            return (temp_rates[0])
        }

        let min = temp_rates[0].price;
        let final = { "property_id": property_id, "price": temp_rates[0].price, "currency": temp_rates[0].currency }
        for (let i = 0; i < temp_rates.length; i++) {
            if (min > temp_rates[i].price) {
                min = temp_rates[i].price
                final = { "property_id": property_id, "price": temp_rates[i].price, "currency": temp_rates[i].currency }
            }
        }
        return final;
    }


    function fetchAllProperties(name) {
        const url = `/api/all_properties_data/${name}`;
        axios.get(url)
            .then((response) => {
                setAllFullProperties(response.data)
                const all_property_room_data = response.data.map(item => (
                    {
                        "property_id": JSON.parse(item.property_data).property_id,
                        ...JSON.parse(item.room_data)
                    }))
                setHotelRoomPrice(all_property_room_data.map(all_property => room_price(all_property)))
                setOnlyBasicDetails(response.data.map(property => (JSON.parse(property.property_data))))
                let property_data = response.data.map(property => (JSON.parse(property.property_data)))
                // unique list of cities having properties
                let all_cities = [...new Set(property_data.map((item) => item?.address[0]?.address_city))];
                setAllCities(all_cities)
                setSelectedCity(all_cities[0])
                setShowUI(1);
                setEmpty(false)
                setHotelDetailLoader(1);

            }
            )
            .catch((error) => {
                setEmpty(true)
                console.log('error in fetching data of all properties')
            })
    }

    function manageCat(allCat) {
        let categories = allCat?.map(cat => cat.cat_name);
        let temp = [... new Set(categories)]
        setCat(temp)
        console.log("Set: " + cat)
    }

    return (
        <main>

            <Header
                bgColor='white'
                menu={menu}
                setMenu={setMenu}
                borderLine={true}
            />
            <div className='px-3 h-full '>
                <div className='my-8 flex items-center'>
                    <div className='w-full md:w-6/12'>
                        {placeDetailLoader === 0 ? <><Loader size={`w-6/12 h-20`} /></> : <>
                            <p className='text-6xl font-medium text-slate-600  inline-block mr-5 md:mr-10 lg:mr-10'>{place} </p>

                        </>}
                        <div className='flex flex-wrap w-3/4 pt-5'>
                            {placeDetailLoader === 0 ? <><Loader size={`w-16 h-8 rounded-3xl`} /><Loader size={`w-16 h-8 ml-1 rounded-3xl`} /> </> : <>
                                {cat.map((item, index) => {
                                    return <span key={index} className='bg-gray-500 text-white py-2 px-2 mx-1 rounded-xl text-xs'>{item}&nbsp;</span>
                                })}
                            </>}

                        </div>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row mb-10'>
                    <div className='w-full lg:w-8/12'>
                        <div>
                            <Swiper
                                centeredSlides={true}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }}

                                modules={[Autoplay, Pagination, Navigation]}
                                className="mySwiper rounded-xl">

                                {placeDetail?.image?.map((img) => {
                                    return <SwiperSlide>
                                        <img
                                            className="object-fill w-full h-96"
                                            src={img.image_link}
                                        />
                                    </SwiperSlide>
                                })}
                            </Swiper>

                            <div className='mt-10'>
                                {placeDetailLoader === 0 ? <Loader size={`w-full h-20`} /> : <>
                                    <div className='city-description'>
                                        <p className='text-slate-500'>{placeDetail?.description}</p>
                                    </div>
                                </>}
                            </div>
                        </div>
                    </div>

                    <div className='mt-10 lg:mt-0 lg:block lg:w-4/12'>
                        <div className='lg:ml-9 py-5 border rounded-lg shadow-lg'>

                            {/* Seasons weather details*/}
                            <div className='flex pb-2'>
                                <div className='pl-6 my-auto'>
                                    <h3 className='text-xl lg:text-2xl leading-none font-bold my-auto border-b-2 border-slate-600 inline-block'>Seasons</h3>
                                </div>
                                <div className='flex justify-end items-center w-6/12  ml-auto pr-4'>
                                    {weatherDetailLoader === 0 ? <Loader size={`w-8 h-7`} /> : <img className='inline-block h-12' src={imageURL}></img>}
                                    {weatherDetailLoader === 0 ? <Loader size={`w-8 h-7`} /> : <span className='text-lg font-medium text-sm'>{weatherTemperature}°C</span>}
                                </div>
                            </div>

                            {/* season period */}
                            <div className='px-6'>
                                {seasonLoader === 0 ? <> <Loader size={`w-full h-6 mb-1`} /> <Loader size={`w-full h-6 mb-1 `} /><Loader size={`w-full h-6 mb-1 `} /><Loader size={`w-full h-6 mb-1 `} /></> : <>
                                    {seasonDetail?.map((season, index) => {
                                        return (
                                            <div key={index} className='flex justify-between border-b pt-2 text-sm text-slate-500'>
                                                <p>{season.season_name}</p>
                                                <p className='pl-2 truncate overflow-hidden'>{season.period}</p>
                                                <div>
                                                    <span>{season.min_temp}°C to </span>
                                                    <span>{season.max_temp}°C</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>}
                            </div>

                            {/*languages*/}
                            <div>
                                <div className=' pl-6 pt-6'>
                                    <h3 className='text-xl lg:text-2xl font-bold border-b-2 border-slate-600 inline-block'>Languages</h3>
                                </div>
                                <div className='px-6 mt-4 flex flex-wrap gap-1'>
                                    {placeDetailLoader === 0 ? <><Loader size={`w-20 h-8  rounded-3xl`} /><Loader size={`w-20 h-8 ml-1 rounded-3xl`} /><Loader size={`w-20 h-8 ml-1 rounded-3xl`} /></> : <>
                                        {placeDetail?.languages_spoken?.map((place, index) => {
                                            return (
                                                <div className=''>
                                                    <p key={index} className='bg-orange-500 text-white py-2 px-2 mx-1 rounded-xl text-sm'>{place?.language}</p>
                                                </div>
                                            );
                                        })}
                                    </>}
                                </div>
                            </div>

                            {/* more about place */}
                            <div>
                                <div className='pl-6 pt-6'>
                                    <h3 className='text-xl lg:text-2xl font-bold border-b-2 border-slate-600 inline-block'>More about place</h3>
                                </div>
                                <div className='px-6 mt-4 flex flex-wrap gap-3'>
                                    {placeDetailLoader === 0 ? <><Loader size={`w-5/12 h-16  rounded-xl`} /><Loader size={`w-5/12 h-16  rounded-xl`} /></> : <>
                                        <p className='bg-slate-200 my-auto md:w-3/12 lg:w-5/12 text-center rounded-xl  text-slate-500 py-2 px-2 mx-1  text-sm'>Distance form Airport:- {placeDetail?.airport_distance}km</p>
                                        <p className='bg-slate-200 my-auto md:w-3/12 lg:w-5/12 text-center rounded-xl  text-slate-500 py-2 px-2 mx-1  text-sm'>Best time to visit:- {placeDetail?.best_time_to_visit}</p>
                                        <p className='bg-slate-200 my-auto md:w-3/12 lg:w-5/12 text-center rounded-xl  text-slate-500 py-2 px-2 mx-1  text-sm'><span className='text-left'>Latitude:- {placeDetail?.latitude}°</span><br /><span>Longitude:- {placeDetail?.longitude}°</span></p>
                                    </>}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <hr className='pb-10' />

                {/* booking form */}
                <div className='hidden lg:block lg:w-4/12 lg:sticky lg:top-0  lg:float-right z-10'>
                    <div className='lg:ml-9 rounded-2xl bg-slate-50 shadow '>
                        <BookingForm />
                    </div>
                </div>

                {/* Attraction div */}
                <div className='w-full lg:w-8/12'>
                    <div className='pb-10 text-center'>
                        <h2 className='font-bold text-2xl lg:text-2xl  border-b-2 border-slate-600 inline-block'>Attractions</h2>
                    </div>
                    {attractionEmpty === false ?
                        <div className='flex flex-wrap md:gap-2 lg:gap-8 md:justify-center pb-14 border-b'>
                            {placeDetailLoader === 0 ? <><Loader size={`w-full mb-1 h-40 block md:inline-block md:w-3/12 md:rounded-xl md:h-40 `} /><Loader size={`w-full h-40 block md:inline-block md:w-3/12 md:rounded-xl md:h-40 `} /></> : <>
                                {placeDetail?.attractions?.map((place, index) => {
                                    return (
                                        <div key={index} className='mb-3 md:mb-0 md:w-60 lg:w-3/12 border rounded-xl shadow  md:hover:shadow-2xl md:hover:scale-105 md:hover:transition-all'>
                                            <div className='p-5'>
                                                <div className='mb-5'>
                                                    <h5 className='text-xl font-semibold text-gray-700 capitalize  border-b-2 border-slate-600 inline-block'>{place.attraction_name}</h5>

                                                </div>

                                                <img src={place.attraction_image_link} className=' rounded-md w-full h-36'></img>
                                                <p className='text-gray-500 tracking-wide text-sm font-normal pt-5'>
                                                    {place.attraction_description}

                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>}

                        </div> :
                        <div className='flex flex-wrap pb-14 lg:h-48  justify-center  border-b'>
                            <h1 className='lg:my-auto text-base  md:text-lg text-slate-500'>No Attractions Found !!!</h1>
                        </div>
                    }

                </div>

                {/* hotels div */}
                <div className='w-full lg:w-8/12'>
                    <div className='py-10 text-center '>
                        <h2 className='font-bold text-2xl lg:text-2xl  border-b-2 border-slate-600 inline-block'>Hotels</h2>
                    </div>

                    {empty === false ?
                        <div className='pb-10 '>
                            {hotelDetailLoader === 0 ? <>
                                <Loader size={`w-full h-44 md:mr-2 md:w-5/12 md:h-44`} /><Loader size={`h-0 md:w-5/12 md:h-44`} /> </> : <>
                                <Carousel
                                    cols={3} rows={1} gap={20} autoPlay={5000} loop={true}
                                    responsiveLayout={[
                                        {
                                            breakpoint: 480,
                                            cols: 1,
                                            rows: 1,
                                            gap: 10,
                                            loop: true,
                                            autoplay: 1000
                                        },
                                        {
                                            breakpoint: 810,
                                            cols: 2,
                                            rows: 1,
                                            gap: 10,
                                            loop: true,
                                            autoplay: 1000
                                        },
                                        {
                                            breakpoint: 1200,
                                            cols: 3,
                                            rows: 1,
                                            gap: 10,
                                            loop: true,
                                            autoplay: 1000
                                        },
                                    ]}
                                >
                                    {onlyBasicDetails?.map((hotel, idx) =>
                                    (hotel?.address[0].address_city === selectedCity && hotel.status === true ?
                                        <Carousel.Item key={idx}>
                                            <PropertyCard bgcolor={"bg-white z-50 shadow-lg"} hotel={hotel} price={hotelRoomPrice.filter(price => price.property_id === hotel.property_id)[0]} />
                                        </Carousel.Item>

                                        : <></>
                                    ))}
                                </Carousel>
                            </>}

                        </div> :
                        <div className='flex flex-wrap pb-14 lg:h-48 justify-center  border-b'>
                            <h1 className='lg:my-auto text-base md:text-xl text-slate-500'>No Registered Property Found !!!</h1>
                        </div>}
                </div>

            </div>

            <button className='block z-10 mx-auto text-center text-white font-medium w-5/12 sticky bottom-2 md:bottom-5 rounded-2xl py-5 bg-blue-700/90 lg:hidden' onClick={() => { setShowModalBooking(1) }}>Find Hotel</button>

            <Footer />



            {/*-------------------- menu bar for small and medium screen----------- */}
            {menu === true ? <MenuSM bgColor={`bg-slate-100`} /> : <></>}

            {/* ---------------booking form for small and medium screen--------------- */}
            {showModalBooking === 1 ?
                <Modal
                    description={<BookingForm />}
                    setShowModal={(e) => setShowModalBooking(e)}
                />
                : <></>}


        </main>
    )
}

export default place;