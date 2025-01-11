'use client';
// styling/page.js
import { useState } from 'react';
import Image from 'next/image';
import styles from './styles/styling.css';
import ProgressBar from './components/ProgressBar';
import ItemModal from './components/ItemModal';
import { getCurrentUserInfo, setCurrentUserInfo } from '../api/api_call';




const Home = () => {
    // const [CurrentInfo, setCurrentInfo] = useState({});

    const [selectedItems, setSelectedItems] = useState({
        tshirt: null,
        shoes: null,
        glasses: null,
        scooter: null,
        skin: null,
        clean: null
    });
    const [modalType, setModalType] = useState(null);


    const image_url = {
        0: '/avatar.png',
        1: '/dino.png',
        2: '/005.png',
        6: '/006.png',
        14: '/007.png',
        30: '/008.png'
    }


    const inst2value = (item) => {
        let shirt = 1;
        if (item.tshirt == null || item.tshirt == 0) {
            shirt = 0;
        }
        let shoe = 1;
        if (item.shoes == null || item.shoes == 0) {
            shoe = 0;
        }
        let glass = 1;
        if (item.glasses == null || item.glasses == 0) {
            glass = 0
        }
        let scooter = 1
        if (item.scooter == null || item.scooter == 0) {
            scooter = 0
        }
        let result = 2 * shirt + 4 * scooter + 8 * glass + 16 * shoe;
        if (image_url.hasOwnProperty(result)) {
            return image_url[result];
        } else {
            return '/dino.png'
        }

    }



    const handleItemSelect = (type, item) => {
        console.log(type, item)
        setCurrentUserInfo({
            "name": type,
            "id": item
        })
        setSelectedItems((prev) => ({ ...prev, [type]: item }));
        setModalType(null);
    };

    return (
        <div className="flex flex-col items-center p-5">
            <h1 className="text-2xl font-bold mb-4">ECOO의 옷장</h1>
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => {
                getCurrentUserInfo(setSelectedItems);

            }}>새로 고침</button>
            <button onClick={() => console.log(selectedItems)}>show current info</button>
            {/* Image Component */}
            <div className="relative w-72 h-72">
                <Image
                    src={inst2value(selectedItems)} // Replace with your base avatar image path # based on the combination it is going to pop out
                    alt="Avatar"
                    width={300}
                    height={300}
                />
                <div className="absolute top-0 left-0">
                    {/* {selectedItems.tshirt && <Image src={selectedItems.tshirt} alt="T-Shirt" width={300} height={300} />}
                    {selectedItems.shoes && <Image src={selectedItems.shoes} alt="Shoes" width={300} height={300} />}
                    {selectedItems.glasses && <Image src={selectedItems.glasses} alt="Glasses" width={300} height={300} />}
                    {selectedItems.scooter && <Image src={selectedItems.scooter} alt="Scooter" width={300} height={300} />} */}
                </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4 my-5">
                <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setModalType('tshirt')}>상의</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setModalType('shoes')}>신발</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setModalType('glasses')}>악세사리</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setModalType('scooter')}>전동 킥보드</button>
            </div>

            {/* Progress Bar */}
            <ProgressBar progress={80} /> {/* Replace 60 with dynamic value */}

            {/* Modal */}
            {modalType && (
                <ItemModal
                    type={modalType}
                    onSelect={(item) => handleItemSelect(modalType, item)}
                    onClose={() => setModalType(null)}
                />
            )}
        </div>
    );
};

export default Home;