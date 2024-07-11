import { Outlet } from "react-router-dom";
// import TopNav from "../components/host/TopNavHost"

function GuestLayout() {

    return (
        <div className="flex flex-col min-h-screen">
            {/* <TopNav /> */}
            <main className="">
                <Outlet />
            </main>          
        </div>
    );
}

export default GuestLayout;