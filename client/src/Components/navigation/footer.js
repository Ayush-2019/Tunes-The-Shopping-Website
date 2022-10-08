import React from "react";
import {Contacts} from '@mui/icons-material';
import {Timelapse} from '@mui/icons-material';
import {Phone} from '@mui/icons-material';
import {Email} from '@mui/icons-material';
import {useSelector} from 'react-redux';

const Footer = ()=> {
    const site = useSelector(state => state.site);
    return(
        <footer className="bck_b_dark">
            <div className="container">
                <div className="logo">
                    TUNES
                </div>

                {
                    site && site.vars ? 

                    <div className="wrapper">
                    <div className="left">
                        <h2>Contact Info</h2>
                        <div className="business_nfo">
                            <div className="tag">
                                <Contacts/>
                                <div className="nfo">
                                    <div>Address</div>
                                    <div>{site.vars.address}</div>
                                </div>
                            </div>

                            <div className="tag">
                                <Phone/>
                                <div className="nfo">
                                    <div>Phone</div>
                                    <div>{site.vars.phone}</div>
                                </div>
                            </div>

                            <div className="tag">
                                <Timelapse/>
                                <div className="nfo">
                                    <div>Work Hours</div>
                                    <div>{site.vars.hours}</div>
                                </div>
                            </div>

                            <div className="tag">
                                <Email/>
                                <div className="nfo">
                                    <div>Email</div>
                                    <div>{site.vars.email}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="left">
                        <h2>Be the first to know</h2>
                        <div>
                            <div>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </div>
                        </div>
                    </div>
                    </div>

                    :null}

            </div>
        </footer>
    )
}

export default Footer;