'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styles from '@/styles';
import { useSession } from '@/context/sessionContext';
import errorHandler from '@/helpers/errorHandler';
import { NextRequest } from 'next/server';

export default function RecoverPassword(request: any) {
    const [passwordToken] = useState(request.searchParams.token)
    const router = useRouter()
    const [user, setUser] = useState({
        password: "",
        repeatPassword: ""
    })
    const [buttonDissabled, setButtonDissabled] = useState(true)
    const [loading, setLoading] = useState(false)

    const onRecoverPassword = async () => {

        try {
            setLoading(true)
            const response = await axios.post('/api/users/recoverPassword/two', {password: user.password, repeatPassword: user.repeatPassword, passwordToken})
            console.log(response)
            toast.success('Contraseña cambiada con éxito!')
            router.push('/')
        } catch (error: any) {
            await errorHandler(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (user.password.length > 0 && user.repeatPassword.length > 0 ) {
            setButtonDissabled(false)
        } else {
            setButtonDissabled(true)
        }
    }, [user])
    return (
        <section className={styles.section.default}>
            <div>
                <h1 className={styles.text.h1}>Recuperar contraseña</h1>
            </div>
            <div className={styles.form.default}>
                <div className="flex flex-col">
                    <label htmlFor="password">Introduce tu nuevo password</label>
                    <input
                        className={styles.input.text}
                        placeholder="password"
                        type="password"
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="repeatPassword">Repetir contraseña:</label>
                    <input
                        className={styles.input.text}
                        placeholder="repetir password"
                        type="password"
                        id="repeatPassword"
                        value={user.repeatPassword}
                        onChange={(e) => setUser({ ...user, repeatPassword: e.target.value })} />
                </div>
                <button onClick={onRecoverPassword}
                    className={styles.button.primary(buttonDissabled)}>
                    Recuperar contraseña
                </button>

            </div>

        </section>)
}