import React from 'react'

type CalendarProps = {
    endDate: any
}

const Calendar: React.FC<CalendarProps> = ({ endDate }) => {
    return (
        <div>
            <span>Pick an end date
                <input type="date" name="" id="" onChange={(ev) => endDate(ev)} />
            </span>
        </div>
    )
}

export default Calendar