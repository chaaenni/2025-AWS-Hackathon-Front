'use client'

import React from 'react'
import { useEffect, useState } from 'react';
import {GoogleMap, LoadScript, MarkerF} from '@react-google-maps/api'


export default function RentLuckyDraw(){
    const containerStyle = {
        width: '393px',
        height: '852px'
    };
    
    const center = {
        lat: 37.487193,
        lng: 127.026227
    }
    
    const [kickPos, setKickPos] = useState(null)
    
    useEffect(()=>{
        fetch("/small_filtered_regionid_560_test_data.json").then(res=>res.json())
        .then(data=>setKickPos(data))
    }, [])

    console.log("KickPos: ", kickPos)

    return(
        <div className='flex items-center font-pretendard'>
            <div>
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={14}
                    >
                    {kickPos && kickPos.map((data, i)=>(
                        <MarkerF key={i}
                            position={{lat:parseFloat(data.end_lat), lng:parseFloat(data.end_lng)}}
                        />
                    ))}
                    </GoogleMap>
                </LoadScript>
                <div className='fixed bottom-[-25px] left-0 px-3 py-2 bg-white w-full h-[200px] rounded-3xl flex flex-col'>
                    <div className='flex flex-col'>
                        <div>
                            <input defaultValue=''/>
                        </div>
                    </div>
                    <div className='flex justify-center text-[14px] font-pretendard_bold'>
                        <div className='rounded-lg px-6 py-2 mr-5 w-[140px] bg-white flex justify-center border text-gray-500'>
                            닫기
                        </div>
                        <div className='rounded-lg px-6 py-2 w-[140px] flex justify-center text-white' style={{backgroundColor: '#12BA54'}}>
                            대여하기
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}