import Image from 'next/image';
// components/ItemModal.js
const ItemModal = ({ type, onSelect, onClose }) => {
    const items = {
      tshirt: [
        { name: 'Default', src: null},
        { name: 'Green T-Shirt', src: '/blue-tshirt.png' },
      ],
      shoes: [
        { name: 'Default', src: null },
        { name: 'Sneakers', src: '/boots.png' },
      ],
      glasses: [
        { name: 'Default', src: null },
        { name: 'Plant', src: '/plant.png' },
      ],
      scooter: [
          { name: 'Default', src: null },
          { name: 'White Scooter', src: '/white-scooter.png' }
      ],
    };

    // 가로 버전
    // return (
    //     <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
    //         <div className="bg-white p-5 rounded text-center">
    //             <h2 className="text-xl font-bold mb-4">Select {type}</h2>
    //             <div className="flex flex-wrap gap-4 justify-center">
    //                 {items[type].map((item) => (
    //                     <div key={item.name} onClick={() => onSelect(item.src)} className="cursor-pointer text-center">
    //                         <Image src={item.src} alt={item.name} width={100} height={100} />
    //                         <p>{item.name}</p>
    //                     </div>
    //                 ))}
    //             </div>
    //             <button className="px-4 py-2 bg-red-500 text-white rounded mb-4" onClick={onClose}>닫기</button>
    //         </div>
    //     </div>
    // );

    // 세로버전 
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded text-center flex flex-col gap-4">
            <h2 className="text-xl font-bold">Select {type}</h2>
            <div className="flex flex-col gap-4">
              {items[type].map((item) => (
                <div
                  key={item.name}
                  onClick={() => onSelect(item.src)}
                  className="cursor-pointer text-center border border-gray-300 rounded p-2 hover:bg-gray-100"
                >
                  {/* <Image src={item.src} alt={item.name} width={100} height={100} /> */}
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
            <button className="px-4 py-2 bg-red-500 text-white rounded mt-4" onClick={onClose}>Close</button>
          </div>
        </div>
      );
};

export default ItemModal;  