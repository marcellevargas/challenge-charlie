import { useState } from 'react';
import "./InputLocation.css";

export default function InputLocation({ city, onSubmit }) {
    const [inputValue, setInputValue] = useState(city);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit(inputValue);
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleFocus = () => {
        setInputValue('');
    };

    const handleBlur = () => {
        if (inputValue === '') {
            setInputValue(city);
        }
    };

    return (
        <div className="location-container">
            <a href="" className="icon" data-icon="("></a>
            <input
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    );
}
