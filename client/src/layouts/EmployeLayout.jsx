import { Outlet } from "react-router-dom";
import SideBar, { SidebarItem } from "@/components/employee/sideBar";
import 
{ 
    LayoutDashboard,
    Box   ,
    PanelsTopLeft   ,
    Clapperboard  ,
    SquarePlay   ,
    Wallet  ,
    Settings ,
    Image  ,
 } from 'lucide-react';
import TopNav from "../components/employee/TopNav";


function ClientLayout() {

    return (
        <>
          <TopNav />
           <SideBar>
                <SidebarItem icon={<LayoutDashboard color="#222222" size={22} />} text={'Dashboard'} location={"/service/dashboard"} />
                <SidebarItem icon={<Settings      color="#222222" size={22}/>} text={'settings'} location={"/service/seetings"} />
            </SideBar>
            <main className="bg-[#fbfcff]">
                <Outlet />
            </main>
        </>
    );
}

export default ClientLayout;