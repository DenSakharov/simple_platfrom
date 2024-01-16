import { useState } from 'react';
import axios from 'axios'
import React from 'react';
import Escencies_table from './Essencies/essence';
import { register } from 'module';
import RegistrationForm from './Registration/RegistrationForm';
function App() {
    // использование контекста сервиса аутентификации
    const [isAuthenticated, setAuthenticated] = useState(false);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');

    const logoutUser = () => {
        setAuthenticated(false);
    };

    const sendLoginData = async () => {
        try {
            setLoading(true);

            // Используйте axios для отправки запроса
            const response = await axios.get('https://localhost:5001/api/login/authenticate', {
                params: {
                    Email: 'test@test.ru',
                    Password: 'yourpasswordA',
                },
            });

            setToken(response.data);
            // Установите флаг аутентификации
            setAuthenticated(true);
        } catch (error) {
            console.error('Ошибка входа:', error);
        } finally {
            setLoading(false);
        }
    };
    /*
    const registration = async () =>
    {
        try
        {
            setLoading(true);

            const response = await axios.get('https://localhost:5001/api/login/register', {
                params: {
                    Email: login+"@test.ru",
                    Password: password,
                },
            });
        }
        catch (error) {
            console.error('Ошибка регистрации:', error);
        } finally {
            setLoading(false);
        }
    }
    */
    // Состояние, которое отвечает за видимость формы
    const [showForm, setShowForm] = useState(false);

    // Функция, которая будет вызываться при нажатии на кнопку "Показать форму"
    const handleShowFormClick = () => {
        // Устанавливаем showForm в true, чтобы показать форму
        setShowForm((prevShowForm) => !prevShowForm);
    };
    const [entities, setEntities] = useState([]);

    return (
        <div>
            {
                isAuthenticated
                    ? (
                        <div>
                            Вы вошли в систему
                            <button
                                style={{
                                    marginRight: 16,
                                }}
                                type="button"
                                onClick={logoutUser}
                            >
                                Выйти
                            </button>
                            <br />
                            <div>
                                <Escencies_table entities={entities} /> 
                            </div>
                            {/*Токен: {token}*/}
                        </div>
                    )
                    : (
                        <div>
                            <div>

                            Логин
                            <br />
                            <input value={login} onChange={(e) => setLogin(e.target.value)} />
                            <br />
                            Пароль
                            <br />
                            <input value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="button" onClick={sendLoginData}>Войти</button>
                            </div>
                            <div>
                                <button onClick={handleShowFormClick}>
                                    {showForm ? 'Скрыть форму регистрации' : 'Показать форму регистрации'}
                                </button>
                                {showForm && <RegistrationForm />}
                            </div>
                        </div>
                    )
            }
          
            <br />
            {loading ? 'Загрузка...' : data}
        </div>
    );
}
export default App;
