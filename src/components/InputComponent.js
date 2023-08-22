import React from 'react';

const InputComponent = ({min, step ,max, type, name, value, placeholder, required, handleInputChange, className, limit, multiple, accept, maxLength, id, checked, disabled }) => {
    return (
        <input id={id} step={step}  min={min} max={max} maxLength={maxLength} autoComplete='none' name={name} onChange={(e) => { handleInputChange(e, limit) }} multiple={multiple} accept={accept} disabled={disabled} className={disabled ? 
            'bg-gray-200 text-gray-400 w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500' : className
        } type={type} placeholder={placeholder} value={value} checked={checked} required={required} />
    );
};

export default InputComponent;
