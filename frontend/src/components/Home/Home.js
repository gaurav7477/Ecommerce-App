import React, { Fragment, useEffect } from "react";
import "./Home.css";
import { CgMouse } from "react-icons/cg";
import ProductCard from "./ProductCard.js";
import MetaData from "../Layout/MetaData";
import { getProducts } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader.js";


const Home = () => {
    const dispatch = useDispatch();
    const { loding, products } = useSelector((state) => state.products);



    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <Fragment>
            {loding ? (
                <Loader />
            ) : <Fragment>
                <MetaData title="Home Working" />

                <div className="banner">
                    <p>Welcome to Ecommerce</p>
                    <h1>FIND AMAZING PRODUCTS BELOW</h1>

                    <a href="#container">
                        <button>
                            Scroll <CgMouse />
                        </button>
                    </a>
                </div>

                <h2 className="homeHeading">Featured Products</h2>

                <div className="container" id="container">
                    {products?.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </Fragment>
            }
        </Fragment>

    );

};

export default Home;