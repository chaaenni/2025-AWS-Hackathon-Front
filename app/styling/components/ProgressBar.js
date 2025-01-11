// components/ProgressBar.js
const ProgressBar = ({ progress }) => {
    return (
        <div className="w-full h-5 bg-gray-300 rounded overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: `${progress}%` }} />
        </div>
    );
};

export default ProgressBar;