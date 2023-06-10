import React from 'react';

const AuthButton = ({ handleSubmit, content, disabled, id }) => {
    return (
        <button type={"submit"} id={id} className={`bg-custom-500 py-2 rounded my-2 text-custom-400 hover:bg-custom-100 transition-all disabled:hover:bg-yellow-400`} disabled={disabled} onClick={handleSubmit}>
            {content}
        </button>
    );
};

export default AuthButton;
