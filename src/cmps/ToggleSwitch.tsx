import React, { useState } from 'react';

type ToggleSwitchProps = {
    onToggle: (isOn: boolean) => void;
    checkedIcon?: React.ReactNode;
    unCheckedIcon?: React.ReactNode;
    isOn?: boolean | null;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    onToggle,
    checkedIcon,
    unCheckedIcon,
    isOn,
}) => {
    const [checked, setChecked] = useState<boolean>(
        isOn === undefined || isOn === null ? false : isOn
    );

    const handleToggle = () => {
        const newValue = !checked;
        setChecked(newValue);
        onToggle(newValue);
    };

    return (
        <label className="toggle-switch">
            <input type="checkbox" checked={checked} onChange={handleToggle} />
            <span className="slider">
                <span className="slider-icon">{checked ? checkedIcon : unCheckedIcon}</span>
            </span>
        </label>
    );
};

export default ToggleSwitch;
