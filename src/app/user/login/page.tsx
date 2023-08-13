'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styles from '@/styles';
import { useSession } from '@/context/sessionContext';
import errorHandler from '@/helpers/errorHandler';

export default function LoginPage() {
    const { createSession } = useSession()
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [buttonDissabled, setButtonDissabled] = useState(true)
    const [loading, setLoading] = useState(false)


    const onLogin = async () => {

        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', user)
            if (response.data.success) {
                await createSession();
                toast.success("Login success")
                router.push("/")
            }

        } catch (error: any) {
            await errorHandler(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDissabled(false)
        } else {
            setButtonDissabled(true)
        }
    }, [user])
    return (
        <section className={styles.section.default}>
            <div>
                <h1 className={styles.text.h1}>Página de identificación</h1>
            </div>
            <div className={styles.form.default}>
                <div className="flex flex-col">
                    <label htmlFor="email">Introduce tu email:</label>
                    <input
                        className={styles.input.text}
                        placeholder="email"
                        type="text"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Introduce la contraseña:</label>
                    <input className={styles.input.text} placeholder="Password" type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>
                <button onClick={onLogin}
                    className={styles.button.primary(buttonDissabled)}>
                    Identificarse
                </button>
                <div>
                    <ul className="flex flex-col">
                        <li className={styles.link.default}><Link href="/user/signup">Crea tu cuenta aquí</Link></li>
                        <li className={styles.link.default}><Link href="/user/recoverPassword/one">¿Has olvidado la contraseña?</Link></li>
                    </ul>
                </div>

            </div>

        </section>)
}