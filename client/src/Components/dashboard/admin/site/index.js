import React from "react";
import DashboardLayout from "HOC/dashboardLayout";
import SiteForm from "./sitevars";
 

const SiteChange = () => {

        return(
            <DashboardLayout title = "Site Vars">
                <SiteForm/>
            </DashboardLayout>
        )
}

export default SiteChange