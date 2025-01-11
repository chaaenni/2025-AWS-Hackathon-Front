'use client'

import React from 'react'
import { useEffect, useState, useRef } from 'react';
import {GoogleMap, LoadScript, MarkerF, Polygon} from '@react-google-maps/api'

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
    url: '/marker/current_pin.svg'
}

const markerLuckyDrawPos = [{
    url: '/marker/luckydraw.svg'
},{
    url: '/marker/luckydraw2x.svg'
}]

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

//주차 가능지역을 그리는 polygon path
const polygonCoordsPos1 = [
    {lat: 37.498828303935824, lng:127.02991147},
    {lat: 37.498954459805205, lng:127.02991147},
    {lat: 37.49923125783023, lng:127.03085617998987},
    {lat: 37.49914339717464, lng:127.03085617998987},
]

const polygonOptionsPos1 = {
    fillColor: '#50AA59',
    fillOpacity: 0.4,
    strokeColor: '#50AA59',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    clickable: true,
    draggable: false,
    editable: false,
    geodesic: false,
}

const polygonCoordsPos2 = [
    {lat: 37.499148201069694, lng:127.02972809618471}, 
    {lat: 37.49945878692876, lng:127.03074884574268}, 
    {lat: 37.49960296847821, lng:127.0306697425521}, 
    {lat: 37.4992991331009, lng:127.02967443895363}, 
]

const polygonOptionsPos2 = {
    fillColor: '#50AA59',
    fillOpacity: 0.4,
    strokeColor: '#50AA59',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    clickable: true,
    draggable: false,
    editable: false,
    geodesic: false,
}

//주차불가지역을 그리는 polygon path
const polygonCoordsNeg = [
    {lat: 37.4992452, lng:127.0286512},
    {lat: 37.4989387, lng:127.028796},
    {lat: 37.49906, lng:127.0292359},
    {lat: 37.499375, lng:127.029091},
    {lat: 37.4992452, lng:127.0286512},
]

const polygonOptionsNeg = {
    fillColor: '#F1676E',
    fillOpacity: 0.4,
    strokeColor: '#F1676E',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    clickable: true,
    draggable: false,
    editable: false,
    geodesic: false,
}

let totalPosLat1 = 0;
let totalPosLng1 = 0;

for (let i = 0; i < polygonCoordsPos1.length; i++) {
    totalPosLat1 += polygonCoordsPos1[i].lat;
    totalPosLng1 += polygonCoordsPos1[i].lng;
}

const avgPosLat1 = totalPosLat1 / polygonCoordsPos1.length;
const avgPosLng1 = totalPosLng1 / polygonCoordsPos1.length;

let totalPosLat2 = 0;
let totalPosLng2 = 0;

for (let i = 0; i < polygonCoordsPos2.length; i++) {
    totalPosLat2 += polygonCoordsPos2[i].lat;
    totalPosLng2 += polygonCoordsPos2[i].lng;
}

const avgPosLat2 = totalPosLat2 / polygonCoordsPos2.length;
const avgPosLng2 = totalPosLng2 / polygonCoordsPos2.length;

const markerPos = [
    {lat: avgPosLat1, lng: avgPosLng1},
    {lat: avgPosLat2, lng: avgPosLng2}
]


export default function RentLuckyDraw(){
    const [kickPos, setKickPos] = useState(null)
    const [centerPos, setCenterPos] = useState(center)
    const [isLoad, setIsLoad] = useState(false)

    const [ifSearchMode, setIfSearchMode] = useState(false)
    const [showDest, setShowDest] = useState(false)
    const [destination, setDestination] = useState('')
    const [isDest, setIsDest] = useState(false)
    const [destLatLng, setDestLatLng] = useState(null)

    const mapRef = useRef(null)

    
    useEffect(()=>{
        fetch("/small_filtered_regionid_560_test_data.json").then(res=>res.json())
        .then(data=>setKickPos(data))
    }, [])

    console.log("KickPos: ", kickPos)

    //현위치 버튼 누르면 작동되는 함수
    const goCurPos = ()=>{
        setIfSearchMode(false)
        setIsDest(false)
        if(mapRef.current){
            mapRef.current.panTo(center)
            mapRef.current.setZoom(16)
        }
    }
    
    //돋보기 모양 버튼 누르면 작동되는 함수(검색 모드로 가게 함)
    const goSearchMode = ()=>{
        setIsDest(false)
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
        setDestination('')
        setIsDest(true)
        setDestLatLng({lat: dest.lat, lng: dest.lng})
        if(mapRef.current){
            mapRef.current.panTo({lat: dest.lat,lng: dest.lng})
            mapRef.current.setZoom(17)
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
                    {isDest && <div>
                        <MarkerF 
                        position={{lat: destLatLng.lat, lng: destLatLng.lng}}
                        />
                        <Polygon 
                        paths={polygonCoordsPos1}
                        options={polygonOptionsPos1}/>
                        <Polygon 
                        paths={polygonCoordsPos2}
                        options={polygonOptionsPos2}
                        />
                        <Polygon
                        paths={polygonCoordsNeg}
                        options={polygonOptionsNeg}
                        />
                        {markerPos.map((data, idx)=>(
                            <MarkerF 
                                position={{lat: data.lat, lng: data.lng}}
                                icon={markerLuckyDrawPos[1 - idx]}
                                key={idx}
                            />
                        ))}
                    </div>}
                    </GoogleMap>
                </LoadScript>
                {/* <div className='fixed bottom-[250px] right-8 bg-black' onClick={goCurPos}>
                        test
                </div> */}
                {ifSearchMode? 
                <div className='fixed bottom-[-25px] left-0 px-3 py-2 bg-white w-full h-[750px] rounded-3xl flex flex-col z-10 transition duration-600'>
                    <form onSubmit={(e)=>{
                        e.preventDefault()

                    }}>
                        <div className='flex justify-content'>
                            <div className='flex flex-col mb-5 mt-5'>
                                <div>
                                    <div className='px-2 mb-3'><span className='font-pretendard_bold'>출발지 <input className='font-pretendard w-[200px] ml-3 border rounded-lg h-[40px] px-3' defaultValue='신라스테이 서초'/></span></div>
                                    <div className='px-2'><span className='font-pretendard_bold'>목적지 
                                        <input className='font-pretendard w-[200px] ml-3 border rounded-lg h-[40px] px-3' 
                                        value={destination}
                                        onChange={handleChange}
                                        placeholder='목적지를 검색하세요'/></span></div>
                                </div>
                            </div>
                            <button type='submit'
                                className='font-pretendard_bold text-white rounded-lg h-[92px] px-5 mt-5 ml-2 flex items-center' style={{backgroundColor: '#12BA54'}} onClick={search}>
                                검색
                            </button>
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
                    <div className='flex items-center'>
                        <img src='character3.png'/>
                        <div className='flex flex-col'>
                            <p className='font-pretendard_bold text-[16px] mb-1 leading-tight'>목적지를 검색해서 근처의 <br/>아늑한 집에 날 데려다줘!</p>
                            <p className='font-pretendard text-[12px]'>목적지 검색해서 적합한 주차 공간 추천받기</p>
                            <div><span className='font-pretendard text-[10px]'>에쿠의 현재 청결도</span>
                                <div className='flex items-center w-full bg-gray-300 rounded h-4 px-1'>
                                    <div className='bg-gradient-to-r from-green-500 to-lime-500 h-3 rounded text-white text-[8px] flex items-center justify-center' style={{width: "50%"}}>50%</div>
                                </div>
                            </div>
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