import React from 'react';

const AuthButton = ({handleSubmit, content, disabled, id}) => {
    return (
        <button type={"submit"} id={id} className={`bg-yellow-400 py-2 rounded my-2 text-gray-950 hover:bg-yellow-500 transition-all disabled:hover:bg-yellow-400`} disabled={disabled} onClick={handleSubmit}>
            {content}
        </button>
    );
};

export default AuthButton;
