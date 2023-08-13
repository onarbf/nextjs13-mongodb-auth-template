export default function UserProfile ({params}: any){
    return(
        <div className="flex flex-col min-h-screen justify-center items-center">
            <h1>Profile</h1>
            <p className="text-4xl">Profile page of {params.id}</p>
        </div>
    )
}