import React from 'react';
import {FcGoogle} from "react-icons/fc";

const SocialNetworkBottom = ({action, handleAction}) => {
    return (
        <div onClick={handleAction} className={'relative flex bg-gray-800 py-2 hover:bg-gray-900 cursor-pointer transition-all justify-center rounded text-white'}>
            <FcGoogle className={'w-8 absolute top-1 left-1.5  h-8'}/>
            <p className={'self-center text-white'}>{action} with google</p>
        </div>
    );
};

export default SocialNetworkBottom;
