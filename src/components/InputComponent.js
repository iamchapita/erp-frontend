import React from 'react';

const InputComponent = ({ type, name, value, placeholder, required, handleInputChange, className, limit, multiple, accept }) => {
    return (
        <input autoComplete='none' name={name} onChange={(e) => { handleInputChange(e, limit) }} multiple={multiple} accept={accept} className={`bg-inherit p-2 border-b border-custom-100 placeholder:text-custom-100 font-thin text-custom-100 focus:outline-none focus:border-custom-200 caret-custom-100 ${className}`} type={type} placeholder={placeholder} value={value} required={required} />
    );
};

export default InputComponent;
