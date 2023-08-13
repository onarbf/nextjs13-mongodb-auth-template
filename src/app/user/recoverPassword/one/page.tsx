'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styles from '@/styles';
import { useSession } from '@/context/sessionContext';
import errorHandler from '@/helpers/errorHandler';

export default function RecoverPassword() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: ""
    })
    const [buttonDissabled, setButtonDissabled] = useState(true)
    const [loading, setLoading] = useState(false)

    const onRecoverPassword = async () => {

        try {
            setLoading(true)
            const response = await axios.post('/api/users/recoverPassword/one', {email: user.email})
            toast.success(response.data.message)
        } catch (error: any) {
            await errorHandler(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (user.email.length > 0 ) {
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
                    <label htmlFor="email">Introduce tu email, al que te enviaremos un código para recuperar tu contraseña</label>
                    <input
                        className={styles.input.text}
                        placeholder="email"
                        type="text"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>
                <button onClick={onRecoverPassword}
                    className={styles.button.primary(buttonDissabled)}>
                    Recuperar contraseña
                </button>
                <div>
                    <ul className="flex flex-col">
                        <li className={styles.link.default}><Link href="/user/login">Tengo una cuenta</Link></li>
                        <li className={styles.link.default}><Link href="/user/signup">Crear una cuenta</Link></li>
                    </ul>
                </div>

            </div>

        </section>)
}