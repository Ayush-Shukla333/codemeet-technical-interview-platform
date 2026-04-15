import { UserButton } from "@clerk/clerk-react";
import { BookOpenIcon, LayoutDashboardIcon } from "lucide-react";
import { Link, useLocation } from "react-router"

function Navbar() {
    const location = useLocation()

    console.log(location)
    const isActive = (path) => location.pathname === path;
    return (
        <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto p-2 flex items-center justify-between">
                {/* LOGO */}
                <Link to="/" className="group flex items-center gap-3 hover:scale-105 transition-transform duration-200">
                    <img
                        src="/logo.svg"
                        alt="Logo"
                        className="size-14 shrink-0 object-contain ml-9"
                    />
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">CodeMeet</span>
                        <span className="text-xs text-base-content/60 font-medium">Connect. Code. Collaborate.</span>
                    </div>
                </Link>

                <div className="flex items-center gap-1">
                    {/* PROBLEMS PAGE LINK */}
                    <Link to={"/problems"} className={`px-3 py-2 rounded-lg mr-5 transition-all duration-200 ${isActive("/problems") ? "bg-primary text-primary-content" : "hover:bg-base-300 text-base-content/70 hover:text-base-content"}`}>
                        <div className="flex items-center gap-x-2.5">
                            <BookOpenIcon className="size-4" />
                            <span className="font-medium hidden sm:inline">Problems</span>
                        </div>
                    </Link>
                    {/* DASHBOARD PAGE LINK */}
                    <Link to={"/dashboard"} className={`px-3 py-2 rounded-lg mr-5 transition-all duration-200 ${isActive("/dashboard") ? "bg-primary text-primary-content" : "hover:bg-base-300 text-base-content/70 hover:text-base-content"}`}>
                        <div className="flex items-center gap-x-2.5">
                            <LayoutDashboardIcon className="size-4" />
                            <span className="font-medium hidden sm:inline">Dashboard</span>
                        </div>
                    </Link>
                    <div className="ml-4 mr-5 mt-2">
                        <UserButton />
                    </div>

                </div>
            </div>
        </nav>
    )
}
export default Navbar

