import React, { ReactNode } from 'react'

type CalendarProps = {
    handleEvent: any;
    isRequired: boolean
    children: ReactNode
}

const Calendar: React.FC<CalendarProps> = ({ handleEvent, isRequired, children }) => {
    return (
        <div>
            {children}
            <input
                type="date"
                name="eventDate"
                id="calendar"
                required={isRequired}
                onChange={(ev) => handleEvent(ev)} />
        </div>
    )
}

export default Calendar