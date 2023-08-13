import React from "react";

import { useSelector } from 'react-redux';

export const Tab = ({ dataTabs, handleTabClick, reducer }) => {
    const { currentTab } = useSelector(state => state[reducer]);

    return (
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {dataTabs.map((item, index) => {
                const isActive = currentTab.index === index;
                const tabClassName = isActive
                    ? 'inline-block p-4 rounded-t-lg bg-custom-300 text-white hover:opacity-90'
                    : 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300';

                return (
                    <li key={index} className="mr-2 cursor-pointer">
                        <p
                            onClick={() => handleTabClick(index, item)}
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
