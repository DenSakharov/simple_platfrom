import axios from 'axios';
import { text } from 'node:stream/consumers';
import React, { useState } from 'react';

const RegistrationForm = () => {

    // Состояния для полей формы
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [position, setPosition] = useState('');


    // Функция, которая будет вызываться при отправке формы
    const handleSubmit = async () => {

        const registrationData = {
            nameBody: name,
            surnameBody: surname,
            loginBody: login,
            ageBody: age,
            positionBody: position
        };
        try {
            //fetch('https://localhost:5001/api/login/register', {
            //    method: 'POST',
            //    headers: {
            //        'Content-Type': 'application/json',
            //    },

            //    body: JSON.stringify(registrationData),
            //})
            //    .then(response => response.json())
            //    .then(data => console.log(data))
            //    .catch(error => console.error('Error:', error));
            const response = await axios.post('https://localhost:5001/api/login/register', {

                Email: login + "@test.ru",
                Password: password,

                name: registrationData.nameBody,
                surname: registrationData.surnameBody,
                login: registrationData.loginBody,
                age: registrationData.ageBody,
                position: registrationData.positionBody,
            });
            console.log(response.data); // В случае успешного запроса
        }
        catch (error) {
            //console.error(error.response.data);
        }
        finally {
        }
    };

    return (
        <div>

            <label>
                Имя:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />

            <label>
                Фамилия:
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </label>
            <br />

            <label>
                Возраст:
                <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
            </label>
            <br />

            <label>
                Должность:
                <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
            </label>
            <br />

            <label>
                Логин:
                <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
            </label>
            <br />

            <label>
                Пароль:
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />

            <button type="button" onClick={handleSubmit }>Отправить</button>

        </div>
    );
};

export default RegistrationForm;
