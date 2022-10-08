import React from "react";

import { CircularProgress } from "@mui/material";

const Loader = ({full}) => (
    <div className={`root_loader ${full? 'full' :''}`}>
            <CircularProgress/>
    </div>
)

export default Loader;