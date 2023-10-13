import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
    getProductDetails
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../Layout/Loader/Loader";
import { Rating } from "@material-ui/lab";
import MetaData from "../Layout/MetaData";

const ProductDeatils = ({ match }) => {
    const dispatch = useDispatch();
    const { product, loading } = useSelector(state => state.productDetails);

    useEffect(() => {
        dispatch(getProductDetails(match.params.id));
    }, [dispatch, match.params.id]);

    const options = {
        color: "rgba(20,20,20,0.1)",
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);


    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };


    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };


    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product.name} -- ECOMMERCE`} />
                    <div className="ProductDetails">
                        <div>
                            <Carousel>
                                {product?.images?.map((item, i) => (
                                    <img
                                        className="CarouselImage"
                                        key={item.url}
                                        src={item.url}
                                        alt={`${i} Slide`}
                                    />
                                ))}
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className="detailsBlock-2-span">
                                    {" "}
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button>
                                        Add to Cart
                                    </button>
                                </div>

                                <p>
                                    Status:{" "}
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>

                            <button onClick={submitReviewToggle} className="submitReview">
                                Submit Review
                            </button>
                        </div>
                    </div>

                    <h3 className="reviewsHeading">REVIEWS</h3>
                    {product.reviews?.[0] ? (
                        <div className="reviews">
                            {product.reviews?.map((review) => (
                                <ReviewCard key={review._id} review={review} />
                            ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProductDeatils;
