import React from 'react';

const InputComponent = ({ type, name, value, placeholder, required, handleInputChange }) => {
    return (
        <input autoComplete='none' name={name} onChange={handleInputChange} className={'p-2 bg-inherit border-b border-custom-100 placeholder:text-custom-100 font-thin text-custom-100 focus:outline-none focus:border-custom-200 caret-custom-100'} type={type} placeholder={placeholder} value={value} required={required} />
    );
};

export default InputComponent;
