import React, { useState } from "react";
import {MDBCardTitle, MDBCardText, MDBTooltip, MDBCardFooter, MDBBtn, MDBIcon,MDBBadge } from "mdbreact";
import { Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";


const Card = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false
}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <div className="float-right">
                    <MDBTooltip placement="top">
                        <MDBBtn tag="a" href={`/product/${product._id}`} color="primary" target="_blank" size="lg" className="p-1 m-0 mr-2 z-depth-0" >
                            <MDBIcon icon="eye" size="lg" color="transparent" />
                        </MDBBtn>
                        <div>View</div>
                    </MDBTooltip>
                </div>

            )
        );
    };

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const showAddToCart = showAddToCartButton => {
        return (
            showAddToCartButton && (
                <div className="float-right">
                    <MDBTooltip placement="top">
                        <MDBBtn onClick={addToCart} size="lg" className="p-1 m-0 mr-2 z-depth-0">
                            <MDBIcon icon="shopping-cart" size="lg" color="transparent"/>
                        </MDBBtn>
                        <div>Add to Cart</div>
                    </MDBTooltip>
                </div>
            )
        );
    };

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => removeItem(product._id)}
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    Remove Product
                </button>
            )
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
            <MDBBadge pill color="info">In Stock</MDBBadge>
        ) : (
                <MDBBadge pill color="danger">Out of Stock</MDBBadge>
            );
    };

    const handleChange = productId => event => {
        setCount(event.target.value < 0 ? 0 : event.target.value);
        if (event.target.value >= 0) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div className="hidden-xl-up">
                    <div className="input-group hidden-xl-up">
                        <div className="input-group hidden-xl-up">
                            <span className="d-inline p-2 bg-dark text-white hidden-xl-up">
                                Adjust Quantity
                            </span>
                        </div>


                        <input
                            type="number"
                            className="form-control"
                            value={count}
                            onChange={handleChange(product._id)}
                        />
                    </div>
                </div>
            )
        );
    };
    return (
        <div className="card hidden-xl-up">
            <ShowImage item={product} url="product" />
            <div className="card-body hidden-xl-up">
                {shouldRedirect(redirect)}
                <MDBCardTitle tag="h5">{product.name}</MDBCardTitle>
                <MDBCardText>{product.description.substring(0, 100)}</MDBCardText>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">${product.price}</li>
                <li className="list-group-item">Category: {product.category && product.category.name}</li>
                <li className="list-group-item">Added on {moment(product.createdAt).fromNow()}</li>
            </ul>
            <MDBCardFooter>

                {showStock(product.quantity)}
                <br />

                {showViewButton(showViewProductButton)}

                {showAddToCart(showAddToCartButton)}

                {showRemoveButton(showRemoveProductButton)}

                {showCartUpdateOptions(cartUpdate)}

            </MDBCardFooter>
        </div>


    );
};

export default Card;
