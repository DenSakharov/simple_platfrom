import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
export default function App() {
    // ������������� ��������� ������� ��������������
    const [isAuthenticated, setAuthenticated] = useState(false);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');
    const logoutUser = () => {
        // ���������� ������� ��� ������ ������������
        // ��� ����� �������� � ���� ����� ������� �������������� ��� ���������� ������
        setAuthenticated(false);
    };

    const setExpired = () => {
        // ���������� ������� ��� ��������� ��������� ������
        // ����� ������������� ����� ������� �������������� � ������������ �������
    };

    const sendLoginData = async () => {
        try {
            setLoading(true);

            // ����������� axios ��� �������� �������
            const response = await axios.get('https://localhost:5001/api/login/authenticate', {
                params: {
                    Email: 'test@test.ru',
                    Password: 'yourpasswordA',
                },
            });


            setToken(response.data.Token);
            // ���������� ���� ��������������
            setAuthenticated(true);
        } catch (error) {
            console.error('������ �����:', error);
        } finally {
            setLoading(false);
        }
    };

    const getData = async () => {
        try {
            setLoading(true);

            // ���������� ������� ��� ��������� ������ � �������
            //const response = await authService.getData();

            //// ��� ��� ��� ��������� ������ �� �������
            setData("test");

        } catch (error) {
            console.error('������ ��������� ������:', error);
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
                            �� ����� � �������
                            <br />
                            <br />
                            <button
                                style={{
                                    marginRight: 16,
                                }}
                                type="button"
                                onClick={logoutUser}
                            >
                                �����
                            </button>

                            <button
                                type="button"
                                onClick={setExpired}
                            >
                                ���������� �����
                            </button>
                            <br />
                            �����: {token}
                        </div>
                    )
                    : (
                        <div>
                            �����
                            <br />
                            <input value={login} onChange={(e) => setLogin(e.target.value)} />
                            <br />
                            ������
                            <br />
                            <input value={password} onChange={(e) => setPassword(e.target.value)} />
                            <br />
                            <br />
                            <button type="button" onClick={sendLoginData}>�����</button>
                        </div>
                    )
            }
            <br />
            <br />
            <button
                type="button"
                onClick={getData}
            >
                �������� ������
            </button>
            <br />
            <br />
            {loading ? '��������...' : data}
        </div>
    );
}
