import "./InputLocation.css";

export default function InputLocation({ state, stateCode }) {
    return (
        <div className="location-container">
            <a href="" className="icon" data-icon="("></a>
            <span>{stateCode}</span><input defaultValue={state}/>
        </div>
    );
}
