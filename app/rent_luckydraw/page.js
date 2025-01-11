'use client'

import React from 'react'
import { useEffect, useState, useRef } from 'react';
import {GoogleMap, LoadScript, MarkerF} from '@react-google-maps/api'

const containerStyle = {
    width: '393px',
    height: '852px'
};

const center = {
    lat: 37.48954561003808,
    lng: 127.03015962461758
}

const markerKickPos = {
    url: '/marker/scooter.svg'
}

const markerCurPos = {
    url: 'marker/current_pin.svg'
}

const destList = [{
    name: "갓덴스시 강남점",
    addr: "서울특별시 강남구 테헤란로 109",
    lat: 37.498823991644514,
    lng: 127.02911446610392
},
{
    name: "갓덴스시 신사점",
    addr: "서울특별시 강남구 신사동 강남대로152길 40",
    lat: 37.517976283554816,
    lng: 127.02255547865593
},
{
    name: "갓덴스시 센트럴시티점",
    addr: "서울특별시 서초구 신반포로 176",
    lat: 37.50330547354302,
    lng: 127.00499029952907
},
{
    name: "갓덴스시 신세계도곡점",
    addr: "서울특별시 강남구 언주로30길 57",
    lat: 37.49002094398798,
    lng: 127.05501077866322 
},]


export default function RentLuckyDraw(){
    const [kickPos, setKickPos] = useState(null)
    const [centerPos, setCenterPos] = useState(center)
    const [isLoad, setIsLoad] = useState(false)

    const [ifSearchMode, setIfSearchMode] = useState(false)
    const [showDest, setShowDest] = useState(false)
    const [destination, setDestination] = useState('')

    const mapRef = useRef(null)

    
    useEffect(()=>{
        fetch("/small_filtered_regionid_560_test_data.json").then(res=>res.json())
        .then(data=>setKickPos(data))
    }, [])

    console.log("KickPos: ", kickPos)

    //현위치 버튼 누르면 작동되는 함수
    const goCurPos = ()=>{
        setIfSearchMode(false)
        if(mapRef.current){
            mapRef.current.panTo(center)
            mapRef.current.setZoom(16)
        }
    }
    
    //돋보기 모양 버튼 누르면 작동되는 함수(검색 모드로 가게 함)
    const goSearchMode = ()=>{
        setIfSearchMode(true)
    }

    //검색 버튼 누르면 작동되는 함수
    const search = ()=>{
        if(destination){
        setIfSearchMode(true)
        setShowDest(true)}
    }

    const handleChange = (event)=>{
        setDestination(event.target.value)
    }

    //목적지 후보 누르면 작동되는 함수. 검색모드 끄고 목적지 주변 보여줌
    const destClick = (dest)=>{
        setIfSearchMode(false)
        setShowDest(false)
        if(mapRef.current){
            mapRef.current.panTo({lat: dest.lat,lng: dest.lng})
            mapRef.current.setZoom(16)
        }
    }
    // const goCurPos = ()=>{
    //     if(mapRef){
    //         mapRef.panTo(center)
    //         mapRef.setZoom(16)
    //     }else{
    //         console.log("error")
    //     }
    // }

    // const onLoad = (map)=>{
    //     mapRef = map
    // }

    return(
        <div className='flex items-center font-pretendard'>
            <div>
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={centerPos}
                        zoom={16}
                        onLoad={(map)=>{mapRef.current = map}}
                    >
                    {kickPos && kickPos.map((data, i)=>(
                        <MarkerF key={i}
                            position={{lat:parseFloat(data.end_lat), lng:parseFloat(data.end_lng)}}
                            icon={markerKickPos}
                        />
                    ))}
                    {center && <MarkerF
                        position={center} 
                        icon={markerCurPos}
                    />}
                    </GoogleMap>
                </LoadScript>
                {/* <div className='fixed bottom-[250px] right-8 bg-black' onClick={goCurPos}>
                        test
                </div> */}
                {ifSearchMode? 
                <div className='fixed bottom-[-25px] left-0 px-3 py-2 bg-white w-full h-[750px] rounded-3xl flex flex-col z-10 transition duration-600'>
                    <form>
                        <div className='flex justify-content'>
                            <div className='flex flex-col mb-5 mt-5'>
                                <div>
                                    <div className='px-2 mb-3'><span className='font-pretendard_bold'>출발지 <input className='font-pretendard w-[200px] ml-3 border rounded-lg h-[40px]' defaultValue='신라스테이 서초'/></span></div>
                                    <div className='px-2'><span className='font-pretendard_bold'>목적지 
                                        <input className='font-pretendard w-[200px] ml-3 border rounded-lg h-[40px]' 
                                        value={destination}
                                        onChange={handleChange}
                                        placeholder='목적지를 검색하세요'/></span></div>
                                </div>
                            </div>
                            <div className='font-pretendard_bold text-white rounded-lg h-[92px] px-5 mt-5 ml-2 flex items-center' style={{backgroundColor: '#12BA54'}} onClick={search}>
                                검색
                            </div>
                        </div>
                    </form>
                    {showDest && 
                        destList.map((dest, idx)=>(
                            <div className='flex flex-col w-[340px] h-[70px] shadow rounded-lg ml-2 px-5 py-4 mb-4' onClick={()=>destClick(dest)} key={idx}>
                                <p className='font-pretendard_bold text-[16px]'>{dest.name}</p>
                                <p className='font-pretendard text-[10px]'>{dest.addr}</p>
                            </div>
                        ))
                    }
                    
                </div>:
                <div className='fixed bottom-[-25px] left-0 px-3 py-2 bg-white w-full h-[250px] rounded-3xl flex flex-col transition duration-600'>
                    <div className='flex justify-center text-[14px] font-pretendard_bold'>
                        <div className='rounded-lg px-6 py-2 mr-5 w-[140px] bg-white flex justify-center border text-gray-500'>
                            닫기
                        </div>
                        <div className='rounded-lg px-6 py-2 w-[140px] flex justify-center text-white' style={{backgroundColor: '#12BA54'}}>
                            대여하기
                        </div>
                    </div>
                </div>}
                {/*button that goes to search mode*/}
                <div className='fixed bottom-[300px] right-5 hover:cursor-pointer hover:scale-110 transition duration-300' onClick={goSearchMode}>
                    <img src='/marker/search.svg'/>
                </div>
                {/*button that goes to current position*/}
                <div className='fixed bottom-[240px] right-5 hover:cursor-pointer hover:scale-110 transition duration-300' onClick={goCurPos}>
                    <img src='/marker/location.svg'/>
                </div>
            </div>
        </div>
    )
}