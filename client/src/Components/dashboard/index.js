import React from "react";

import DashboardLayout from "HOC/dashboardLayout";
import PurchaseHistory from "utils/purchaseHistory";
import { fontFamily } from "@mui/system";

const Dashboard = ({users}) => {


    return(
        <DashboardLayout
            title = "Overview"
        >
           <div className="user_nfo_panel">
                <div>
                    <h3>Account Details</h3>
                <span style={{fontWeight:'bolder', fontFamily:'cursive', display:'inline-block'}}>First Name: </span><span style={{display:'inline-block'}}>{users.data.firstname}</span><br/>
                <span style={{fontWeight:'bolder', fontFamily:'cursive', display:'inline-block'}}>Last Name: </span><span style={{display:'inline-block'}}>{users.data.lastname}</span><br/>
                <span style={{fontWeight:'bolder', fontFamily:'cursive', display:'inline-block'}}>Email I'd: </span><span style={{display:'inline-block'}}>{users.data.email}</span>
                </div>

                {users.data.history ? 
                
                    <div className="user_nfo_panel">
                        <h1>Purchase History</h1>
                        <div className="user_product_block_wrapper">
                            <PurchaseHistory
                                history = {users.data.history}
                            
                            />
                        </div>
                    </div>
                
                : null}
           </div>
        </DashboardLayout>
    )
}

export default Dashboard