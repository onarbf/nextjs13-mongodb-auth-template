'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styles from '@/styles';
import errorHandler from '@/helpers/errorHandler';

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        repeatedPassword:"",
        username: ""
    })
    const [buttonDissabled, setButtonDissabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup', user)
            console.log("Signup success", response.data)
            toast.success(response.data.message)
            router.push('/user/login')
        } catch (error: any) {
            await errorHandler(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.repeatedPassword.length > 0 && user.username.length > 0) {
            setButtonDissabled(false)
        } else {
            setButtonDissabled(true)
        }
    }, [user])

    return (
        <section className={styles.section.default}>
            <div>
                <h1  className={styles.text.h1}>Página de registro</h1>
            </div>
            <div className={styles.form.default}>
            <div className="flex flex-col">
                    <label htmlFor="username">introduce tu nombre de usuario:</label>
                    <input className={styles.input.text} type="text" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder="username" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Introduce tu email:</label>
                    <input className={styles.input.text} type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="email" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Introduzca la contraseña:</label>
                    <input className={styles.input.text}  type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Repetir contraseña:</label>
                    <input className={styles.input.text}  type="password" id="repeatedPassword" value={user.repeatedPassword} onChange={(e) => setUser({ ...user, repeatedPassword: e.target.value })} />
                </div>
                <button onClick={onSignup}
                    className={styles.button.primary(buttonDissabled)}>
                    Registrarse
                </button>
                <div>
                <ul className="flex flex-col">
                        <li className={styles.link.default}>
                            <Link href="/user/login">Ya tengo una cuenta</Link>
                            </li><li className={styles.link.default}>
                            <Link href="/user/recoverPassword/one">¿Has olvidado la contraseña?</Link>
                            </li>
                        
                    </ul>
                </div>
            </div>
        </section>)
}