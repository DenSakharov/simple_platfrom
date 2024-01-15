import { useState } from 'react';
import axios from 'axios'
import React from 'react';
function App() {
    // использование контекста сервиса аутентификации
    const [isAuthenticated, setAuthenticated] = useState(false);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');
    const logoutUser = () => {
        // Реализуйте функцию для выхода пользователя
        // Это может включать в себя вызов сервиса аутентификации для разрушения токена
        setAuthenticated(false);
    };

    const setExpired = () => {
        // Реализуйте функцию для установки истекшего токена
        // Может потребоваться вызов сервиса аутентификации с определенным токеном
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

    const getData = async () => {
        try {
            setLoading(true);

            // Реализуйте функцию для получения данных с сервера
            //const response = await authService.getData();

            //// Ваш код для обработки ответа от сервера
            setData("test");

        } catch (error) {
            console.error('Ошибка получения данных:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            {
                isAuthenticated
                    ? (
                        <div>
                            Вы вошли в систему
                            <br />
                            <br />
                            <button
                                style={{
                                    marginRight: 16,
                                }}
                                type="button"
                                onClick={logoutUser}
                            >
                                Выйти
                            </button>

                            <button
                                type="button"
                                onClick={setExpired}
                            >
                                Просрочить токен
                            </button>
                            <br />
                            Токен: {token}
                        </div>
                    )
                    : (
                        <div>
                            Логин
                            <br />
                            <input value={login} onChange={(e) => setLogin(e.target.value)} />
                            <br />
                            Пароль
                            <br />
                            <input value={password} onChange={(e) => setPassword(e.target.value)} />
                            <br />
                            <br />
                            <button type="button" onClick={sendLoginData}>Войти</button>
                        </div>
                    )
            }
            <br />
            <br />
            <button
                type="button"
                onClick={getData}
            >
                Получить данные
            </button>
            <br />
            <br />
            {loading ? 'Загрузка...' : data}
        </div>
    );
}
export default App;
