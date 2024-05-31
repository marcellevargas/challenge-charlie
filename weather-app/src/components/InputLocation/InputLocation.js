import "./InputLocation.css";

export default function InputLocation({ state, stateCode }) {
    return (
        <div className="location-container">
            <span>{stateCode}</span><input defaultValue={state}/>
        </div>
    );
}
