// ToggleSwitch.js

import React, { useState } from 'react';

type ToggleSwitch = {
    onToggle: Function
    checkedIcon?: React.ReactNode
    unCheckedIcon?: React.ReactNode
    isOn?: boolean | string | null
}

const ToggleSwitch: React.FC<ToggleSwitch> = ({ onToggle, checkedIcon, unCheckedIcon, isOn }) => {
    const [checked, setChecked] = useState(false);

    const handleToggle = () => {
        let newValue = !checked
        setChecked(newValue)
        onToggle(newValue)
    }

    return (
        <label className="toggle-switch">
            <input
                type="checkbox"
                checked={checked}
                onChange={handleToggle}
            />
            <span className="slider">
                <span className="slider-icon">
                    {checked ? checkedIcon : unCheckedIcon}
                </span>
            </span>
        </label>
    );
};

export default ToggleSwitch;
