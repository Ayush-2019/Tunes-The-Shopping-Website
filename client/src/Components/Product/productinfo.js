import React, {useState} from "react";
import { TunesButton } from "utils/tools";
import { LocalShipping, DoneOutline, SentimentVeryDissatisfiedOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { AddToUserCart } from "store/actions/user.actions";
import AddToCart from 'utils/addToCart'


const ProdInfo = (props) => {

    const[modal, setModal] = useState(false);
    const [errType, setErrType] = useState(null);
    const user = useSelector(state => state.users);
    const dispatch = useDispatch();

    const closeModal = () => setModal(false)

    const handleAddToCart = (item) => {
        if(!user.auth){
            setModal(true)
            setErrType('auth')
            return false
        }
        if(!user.data.verified){
            setModal(true)
            setErrType('verify')
            return false
        }

        dispatch(AddToUserCart(item))
    }

    const data = props.data;

    const showTags = (data) => (
        <div className="product_tags">
            <div className="tag">
                <div><LocalShipping/></div>
                <div className="tag_text">{data.shipping ? 
                    <div> Free Shipping for USA</div>
                    :


                    <div>No Free Shipping</div>
                }
                
                
                </div>
            </div>
            {data.available > 0 ?  
            
            <div className="tag">
                <div><DoneOutline/></div>
                <div className="tag_text">
                
                <div>
                    <strong>
                        {data.available} </strong>
                    Items left
                </div>
                
                </div>
            </div>
            
            
            :  
            
            <div className="tag">
                <div><SentimentVeryDissatisfiedOutlined/></div>
                <div className="tag_text">
                
                <div>
                    <strong>
                        {data.available} </strong> Items left. Please check regularly for updates!!
                </div>
                
                </div>
            </div>
            }
        </div>
    )

    const showActions = (data) => (
        <div className="product_actions">
            <div className="price">${data.price}</div>
            <div className="cart">
                <TunesButton
                    type = "add_to_cart_link"
                    runAction = {() => handleAddToCart(data)}
                />
            </div>
        </div>
    )

    const showSpecs = (data) => (
        <div className="product_specifications">
            <h2>Specifications</h2>

            <div>
                <div className="item">
                    <strong>Frets: </strong> {data.frets}
                </div>
                <div className="item">
                    <strong>Wood Type: </strong> {data.woodtype}
                </div>
            </div>
        </div>
    )
    return(
        <div>
            <h1>{data.brand.name}</h1>
            <p style={{textAlign:'justify'}}>{data.description}</p>

            {showTags(data)}

            {showActions(data)}

            {showSpecs(data)}

            <AddToCart
                        modal = {modal}
                        errType = {errType}
                        closeModal = {closeModal}
                        />
        </div>
    )
}

export default ProdInfo;