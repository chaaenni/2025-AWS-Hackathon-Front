'use client'
import { useState } from "react";
import {getRandomScooterLog} from "../api/api_call";
import wwp from "./waiting-wp.svg";
import Image from 'next/image';


export default function waitingNotification() {
    const [scooterLog, setScooterLog] = useState({});
    return (<div className="relative w-[393px] h-[852px]">
        <Image src={wwp}
            alt="Background"
            width={393} />
        <div className="absolute inset-0 flex items-center justify-center z-10 -translate-y-20">
            <p className="object-contain w-[210px] animate-slideInFromRight delay-500"> 지금 준비중인 지쿠 201754호는 우리 동네에 이사온 지 오늘로 73일이 되었어요✨ 1242번째 손님을 태울 수 있어 기쁘다네요🎶</p>
        </div>
    </div>
    );
}