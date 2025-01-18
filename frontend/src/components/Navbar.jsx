import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.jsx";
import { Link } from "react-router-dom";
const Navbar = () => {
    const { logout, authUser } = useAuthStore();
    return (
        <header className="bg-base-100 border-b border-base-300 fixed top-0 z-40 w-full backdrop-blur-lg bg-base-100/80">
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all duration-200 cursor-pointer">
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className="text-lg font-bold">Gappa Tappa</h1>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link to={"/settings"} 
                        className={`hover:opacity-80 transition-colors duration-200 cursor-pointer btn btn-sm gap-2 `}
                        >
                            <Settings className="size-4"/>
                            <span className="hidden sm:inline">Settings</span>
                        </Link>

                        {authUser && (
                            <>
                                <Link to={'/profile'} className={`btn btn-sm gap-2`}>
                                    <User className="size-5"/>
                                    <span className="hidden sm:inline">Profile</span>
                                </Link>
                                <button className="flex gap-2 items-center" onClick={logout}>
                                    <LogOut className="size-5" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        )}
                            
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar