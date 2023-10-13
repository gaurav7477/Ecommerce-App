import React, { Fragment, useEffect } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../Layout/MetaData";
import { getProducts } from "../../actions/productAction";


const Products = ({ match }) => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.products);

    const keyword = match.params.keyword;

    useEffect(() => {
        dispatch(getProducts(keyword));
    }, [dispatch, keyword]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={"Products"} />
                    <h2 className="productsHeading"> Products</h2>
                    <div className="products">
                        {products?.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}


export default Products;