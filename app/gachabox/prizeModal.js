import Image from 'next/image';
import { useState } from 'react';
const PrizeModal = ({item, onClose}) => {    
    // 세로버전 
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded text-center flex flex-col gap-4">
                <h2 className="text-xl font-bold">당신을 위한 작은 선물!</h2>
                <div className="flex flex-col gap-4">
                    <div
                        className="cursor-pointer text-center border border-gray-300 rounded p-2 hover:bg-gray-100"
                    >
                    <p>{item.name}</p>
                    </div>
                </div>
                <button className="px-4 py-2 bg-red-500 text-white rounded mt-4" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default PrizeModal;