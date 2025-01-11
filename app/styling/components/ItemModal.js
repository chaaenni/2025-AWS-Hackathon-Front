import Image from 'next/image';
// components/ItemModal.js
const ItemModal = ({ type, onSelect, onClose }) => {
    const items = {
      tshirt: [
        { name: '기본', src: 0},
        { name: '초록 티셔츠', src: 1 },
      ],
      shoes: [
        { name: '기본', src: 0 },
        { name: '운동화', src: 1 },
      ],
      accessory: [
        { name: '기본', src: 0 },
        { name: '새싹', src: 1 },
      ],
      scooter: [
          { name: '기본', src: 0 },
          { name: '흰색 스쿠터', src: 1 }
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
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center font-pretendard">
          <div className="bg-white w-[300px] h-[300px] p-5 rounded-2xl text-center flex flex-col gap-4">
            <h2 className="text-xl font-pretendard_bold">select {type}</h2>
            <div className="flex flex-col gap-4">
              {items[type].map((item) => (
                <div
                  key={item.name}
                  onClick={() => onSelect(item.src)}
                  className="cursor-pointer text-center border border-gray-300 rounded-2xl p-2 hover:bg-gray-100"
                >
                  {/* <Image src={item.src} alt={item.name} width={100} height={100} /> */}
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
            <button className="px-4 py-2 bg-green-500 text-white rounded-2xl mt-4" onClick={onClose}>닫기</button>
          </div>
        </div>
      );
};

export default ItemModal;  