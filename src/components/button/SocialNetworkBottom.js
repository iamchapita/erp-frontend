import React from 'react';
import { FcGoogle } from "react-icons/fc";

const SocialNetworkBottom = ({ action, handleAction }) => {
    return (
        <div onClick={handleAction} className={'relative flex bg-custom-100 py-2 hover:bg-custom-500 cursor-pointer transition-all justify-center rounded text-white'}>
            <FcGoogle className={'w-8 absolute top-1 left-1.5  h-8'} />
            <p className={'self-center text-white'}>{action} con Google</p>
        </div>
    );
};

export default SocialNetworkBottom;
