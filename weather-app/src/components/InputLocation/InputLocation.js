import { useState } from 'react';
import "./InputLocation.css";

export default function InputLocation({ state, stateCode, onSubmit }) {
    const [inputValue, setInputValue] = useState(state);


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit(inputValue);
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="location-container">
            <a href="" className="icon" data-icon="("></a>
            <span>{stateCode}</span>
            <input
                defaultValue={state}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}
