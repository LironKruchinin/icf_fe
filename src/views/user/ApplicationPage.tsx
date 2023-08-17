import React, { useEffect, useRef, useState } from 'react';
import { FormEntries } from '../../interface/Application';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
const ApplicationPage = () => {
    const userData = useSelector((state: RootState) => state.userProfile.data)
    const navigate = useNavigate()
    const formRef = useRef<HTMLFormElement>(null!);
    const [formData, setFormData] = useState({})
    const applicationEntries: FormEntries[] = [
        {
            entryName: 'entry.839671163',
            placeholder: 'First name',
            inputType: 'text',
            labelText: 'hello',
            value: userData?.first_name
        },
        {
            entryName: 'entry.798618593',
            placeholder: 'Last name',
            inputType: 'text',
            labelText: '',
        },
        {
            entryName: 'entry.855053987',
            placeholder: 'Discord nickname',
            inputType: 'text',
            labelText: '',
            value: userData?.user_name
        },
        {
            entryName: 'entry.1904768786',
            placeholder: 'Age',
            inputType: 'text',
            labelText: '',
        },
        {
            entryName: 'entry.1671175554',
            placeholder: 'Hours played',
            inputType: 'text',
            labelText: '',
        },
        {
            entryName: 'entry.231720674',
            placeholder: 'Reason to join',
            inputType: 'text',
            labelText: '',
        },
        {
            entryName: 'entry.1502296283',
            placeholder: 'Were you in a previous clan?',
            inputType: 'radio',
            radioOptions: [
                { display: 'Yes', value: 'כן' },
                { display: 'No', value: 'לא' },
            ],
            labelText: 'Were you in a previous clan?',
        },
        {
            entryName: 'entry.1759490461',
            placeholder: 'freeTime',
            inputType: 'text',
            labelText: '',
        },
        {
            entryName: 'entry.6554940',
            placeholder: 'Do you have 3 hours to play at Friday?',
            inputType: 'radio',
            radioOptions: [
                { display: 'Yes', value: 'כן' },
                { display: 'No', value: 'לא' },
            ],
            labelText: 'Do you have 3 hours to play at Friday?',
        },
    ]

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (ev: { preventDefault: () => void; }) => {
        ev.preventDefault();
        setFormData({})

        navigate('/')
        formRef.current.submit();
    };

    return (
        <div>
            <form
                ref={formRef}
                method="POST"
                action="https://docs.google.com/forms/d/e/1FAIpQLSd0w2_7Buz3TcUTCnl7sA3Xc-r89dqO3ApwjCqI_8WKYjppOg/formResponse"
                target='_blank'
                onSubmit={handleSubmit}
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
                            value={item.value}
                            onChange={handleInputChange}
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
