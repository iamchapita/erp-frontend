
import React from 'react'
import { useState } from 'react';

export const Tab = ({ data , action }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {data.map((item, index) => {
                const isActive = activeTab === index;
                const tabClassName = isActive
                    ? 'inline-block p-4 rounded-t-lg bg-custom-300 text-white hover:opacity-90'
                    : 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300';

                return (
                    <li key={index} className="mr-2 cursor-pointer">
                        <p
                            onClick={() => handleTabClick(index)}
                            aria-current={isActive ? 'page' : undefined}
                            className={tabClassName}
                        >
                            {item}
                        </p>
                    </li>
                );
            })}
        </ul>
    );
};
