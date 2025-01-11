// components/ProgressBar.js
const ProgressBar = ({ progress }) => {
    return (
        <div className="w-[280px] h-6 bg-gray-300 rounded-3xl overflow-hidden flex items-center px-2">
            <div className="bg-gradient-to-r from-green-500 to-lime-500 h-4 text-white text-[10px] flex 
            items-center justify-center rounded-3xl" style={{ width: `${progress}%` }}></div>
        </div>
    );
};

export default ProgressBar;