'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import { useSession } from "@/context/sessionContext"
import styles from "@/styles"
import errorHandler from "@/helpers/errorHandler"
export default function NavBar(){
  const router = useRouter()
  const {session, removeSession} = useSession()
  const handleLogout = async ()=>{
    try {
      const response = await axios.get('/api/users/logout')
      removeSession();
      toast.success('Logout successful')
      router.push('/user/login')

    } catch (error: any) {
      await errorHandler(error)
    }
  }
    return (
        <header className="flex flex-col ">
          <div className="border border-fgrey-300 bg-fgrey-100 flex justify-end px-2">
            <h1 className="text-4xl">
              <Link href="/">FCoches</Link>
              </h1>
          </div>

          <div className="border border-fgrey-300 bg-fgrey-100 flex justify-end px-2 mt-1">
            <ul className="flex gap-2">

            {!session.isLogged  && <li className={styles.link.default}><Link href="/user/signup">Registrarse</Link> </li>}
            {!session.isLogged && <li className={styles.link.default}><Link href="/user/login">Identificarse</Link> </li>}
           {session.isLogged && <li ><button className={styles.link.default} onClick={handleLogout}>Cerrar Sesión</button> </li>}
            </ul>
          </div>

        </header>
    )
}