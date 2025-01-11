import { wwp } from "./waiting-wp.svg";

export const  waitingNotification= () => {
    return (<div className="relative w-[393px] h-[852px]">
        <Image src={wwp}
            alt="Background"
            width={393} />
    </div>
    )
}