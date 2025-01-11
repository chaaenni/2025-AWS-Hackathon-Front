'use client';
import Image from "next/image";
import background from "./gatcha.svg";
import giftbox from "./gift-1.svg"
import { useState } from "react";
import { gacha, setInventoryInfo } from "../api/api_call";
import PrizeModal from "./prizeModal.js";
import { redirect } from "next/navigation";

export default function Gatchabox() {
    const [effect, setEffect] = useState(false);
    const [ran, setRan] = useState(false);
    const [prize, setPrize] = useState({});
    const [modalOpen, setmodalOpen] = useState(false);
    return (<div className="relative w-[393px] h-[852px]">
        <Image src={background}
            alt="Background"
            width={393} />
        <div className="absolute inset-0 flex items-center justify-center z-10 -translate-y-20">
            <Image src={giftbox}
                className={`${effect && 'animate-fadeOut'} ${ran ? "hidden" : ""} object-contain`}
                onClick={() => { setEffect(true); gacha(setPrize); }}
                onAnimationEnd={() => {
                    console.log(prize);
                    setRan(true);
                    setmodalOpen(true);
                    console.log(modalOpen); 
                }}
                alt="giftbox"
                width={160}
                height={160}
            />

            {modalOpen && (<PrizeModal
                item={prize}
                // onClose={() => { console.log("Close button"); setInventoryInfo(prize); setmodalOpen(false);}} 
                onClose={() => redirect("/")} 
                />)}
        </div>
    </div>);
}