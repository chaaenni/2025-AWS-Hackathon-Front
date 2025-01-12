'use client'
import { useState, useEffect } from "react";
import {getRandomScooterLog} from "../api/api_call";
import wwp from "./waiting-wp.svg";
import Image from 'next/image';
import { redirect } from "next/navigation";


export default function waitingNotification() {
    const [scooterLog, setScooterLog] = useState({});
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        getRandomScooterLog(setScooterLog);
        console.log(scooterLog);
        setIsVisible(true);
        setTimeout(() => {redirect("/gachabox")}, 5000);
    }, [])

    return (<div className="relative w-[393px] h-[852px]">
        <Image src={wwp}
            alt="Background"
            width={393} />
        <div className="absolute inset-0 flex items-center justify-center flex-col z-10 -translate-y-20">
            <p className={`text-xl object-contain w-[250px] ${isVisible? "animate-slideInFromRight": "opacity-0"} delay-500`}> 지금 준비중인 지쿠는 <strong>{scooterLog.start_date}</strong>에 운행을 <br/> 시했어요! <br/><br/> 당신을 <strong>{scooterLog.total_rides}</strong>번째 손님으로 태울 수 있어 기쁘다네요! ️🎶</p>
            <p className={`my-10 text-sm text-center object-contain w-[320px] ${isVisible? "animate-slideInFromRight": "opacity-0"} delay-500`}> <strong className="text-md">믿거나 말거나:</strong> <br/> "지쿠의 가장 친한 친구는 자연의 힘을 지닌 엘프들이다."</p>
        </div>
    </div>
    );
}