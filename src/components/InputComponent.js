import React from 'react';

const InputComponent = ({min, step ,max, type, name, value, placeholder, required, handleInputChange, className, limit, multiple, accept, maxLength, id, checked }) => {
    return (
        <input id={id} step={step}  min={min} max={max} maxLength={maxLength} autoComplete='none' name={name} onChange={(e) => { handleInputChange(e, limit) }} multiple={multiple} accept={accept} className={`bg-inherit p-2 border-b border-custom-100 placeholder:text-custom-100 font-thin text-custom-100 focus:outline-none focus:border-custom-200 caret-custom-100 ${className}`} type={type} placeholder={placeholder} value={value} checked={checked} required={required} />
    );
};

export default InputComponent;
