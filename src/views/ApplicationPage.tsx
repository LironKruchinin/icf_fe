import React from 'react';
import { FormEntries } from '../interface/Application';

const ApplicationPage = () => {

    /*
    https://docs.google.com/forms/d/e/1FAIpQLSd0w2_7Buz3TcUTCnl7sA3Xc-r89dqO3ApwjCqI_8WKYjppOg/viewform?usp=pp_url&entry.839671163=a&entry.798618593=a&entry.855053987=a&entry.1904768786=a&entry.1671175554=a&entry.231720674=a
    &entry.1502296283=%D7%9B%D7%9F
    &entry.1759490461=aaa
    &entry.6554940=%D7%9C%D7%90
    */

    const applicationEntries: FormEntries[] = [
        {
            entryName: 'entry.839671163',
            placeholder: 'First name',
            inputType: 'text',
            labelText: ''
        },
        {
            entryName: 'entry.798618593',
            placeholder: 'Last name',
            inputType: 'text',
            labelText: ''
        },
        {
            entryName: 'entry.855053987',
            placeholder: 'Discord nickname',
            inputType: 'text',
            labelText: ''
        },
        {
            entryName: 'entry.1904768786',
            placeholder: 'Age',
            inputType: 'text',
            labelText: ''
        },
        {
            entryName: 'entry.1671175554',
            placeholder: 'Hours played',
            inputType: 'text',
            labelText: ''
        },
        {
            entryName: 'entry.231720674',
            placeholder: 'Reason to join',
            inputType: 'text',
            labelText: ''
        },
        {
            entryName: 'entry.1502296283',
            placeholder: 'Were you in a previous clan?',
            inputType: 'radio',
            radioOptions: [
                { display: 'Yes', value: 'כן' },
                { display: 'No', value: 'לא' },
            ],
            labelText: 'Were you in a previous clan?'
        },
        {
            entryName: 'entry.1759490461',
            placeholder: 'freeTime',
            inputType: 'text',
            labelText: ''
        },
        {
            entryName: 'entry.6554940',
            placeholder: 'Do you have 3 hours to play at Friday?',
            inputType: 'radio',
            radioOptions: [
                { display: 'Yes', value: 'כן' },
                { display: 'No', value: 'לא' },
            ],
            labelText: 'Do you have 3 hours to play at Friday?'
        },
    ]
    return (
        <div>
            <form
                method="POST"
                action="https://docs.google.com/forms/d/e/1FAIpQLSd0w2_7Buz3TcUTCnl7sA3Xc-r89dqO3ApwjCqI_8WKYjppOg/formResponse"
                target='_blank'
            >
                {applicationEntries.map((item, index) => {
                    if (item.inputType === 'radio' && item.radioOptions) {
                        return (
                            <div key={index} className='input-group'>
                                <label>{item.labelText}</label>
                                {item.radioOptions.map((option, oIndex) => (
                                    <div key={`${index}-${oIndex}`}>
                                        <input
                                            type="radio"
                                            name={item.entryName}
                                            value={option.value}
                                            id={`${item.entryName}-${oIndex}`}
                                        />
                                        <label htmlFor={`${item.entryName}-${oIndex}`}>{option.display}</label>
                                    </div>
                                ))}
                            </div>
                        );
                    }

                    return (
                        <input
                            key={index}
                            className='input'
                            type={item.inputType}
                            name={item.entryName}
                            placeholder={item.placeholder}
                        />
                    );
                })}

                <button className="button" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ApplicationPage;
