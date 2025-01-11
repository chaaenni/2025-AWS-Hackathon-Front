import Image from "next/image";
import background from "./gatcha.svg";
import giftbox from "./gift-1.svg"

export default function Gatchabox() {
    return (<div className="relative w-full">
        <Image src={background}
            alt="Background"
            width={393} />
        <div className="absolute inset-0 flex items-center justify-center z-10">
            <Image src={giftbox}
                className="object-contain"
                alt="giftbox"
                width={160}
                height={160}
            />
        </div>
    </div>);
}