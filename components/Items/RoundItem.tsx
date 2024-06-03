import React from 'react';

interface RoundDataProps {
    date: string;
    time: string;
    condition: string;
}

const RoundItem: React.FC<RoundDataProps> = ({ date, time, condition }) => {
    return (
        <div className="flex flex-col items-start justify-start text-left border-b-2 border-gray-300 pb-1">
            <p className="text-gray-600">{date} {time}</p>
            <p className="text-gray-600"></p>
            <p className="text-sm text-gray-500 font-thin">{condition}</p>
        </div>
    );
};

export default RoundItem;
