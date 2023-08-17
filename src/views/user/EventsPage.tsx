import { useState } from 'react';
import Calendar from '../../cmps/Calendar';
import Modal from '../../cmps/Modal';

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [endDate, setEndDate] = useState(null);
    const millDay = 86400000

    const getEndDate = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = target
        const endDate = Date.parse(value)
        const howManyDaysLeft = Math.ceil((endDate - Date.now()) / millDay)
        const closeDate = endDate - millDay * 2
        console.log('closeDate', closeDate);


        if (howManyDaysLeft > 2) {
            console.log('can sign up to event \n days left:', howManyDaysLeft)
            const date = new Date(closeDate)
            console.log(date.toLocaleDateString('en-GB'));
        } else {
            console.log('event closed \n days left:', howManyDaysLeft);

        }
    }

    const handleInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = target
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Modal Content</h2>
                <p>This is the content of the modal.</p>
                <Calendar endDate={getEndDate} />
            </Modal>
        </div>
    );
};

export default App;
