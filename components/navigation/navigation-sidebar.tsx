import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import {db} from "@/lib/db";

import NavigationAction from "./navigation-action";

const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if(!profile){
        return redirect("/")
    }

    const server = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });


    return ( 
        <div className="space-y-4 flex-col items-center h-full text-primary w-full dark:bg-[#1e1f22] py-3">
            <NavigationAction /> 
        </div>
     );
}
 
export default NavigationSidebar;