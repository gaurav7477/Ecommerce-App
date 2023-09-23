class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i' // case insensitive
            },
        } : {};

        // console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;
    }


    filter() {
        const queryCopy = { ...this.queryString };
        // console.log(queryCopy);

        // Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page'];

        removeFields.forEach(el => delete queryCopy[el]);
        // console.log(queryCopy);

        //filter for price and ratings
        console.log(queryCopy);
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        console.log(queryStr);

        this.query = this.query.find(queryCopy);
        return this;

    }

    pagination(resultsPerPage) {
        const currentPage = Number(this.queryString.page) || 1;

        const skip = resultsPerPage * (currentPage - 1);
        this.query = this.query.limit(resultsPerPage).skip(skip);   // limit is the number of results per page

        return this;
    }
}
export default ApiFeatures;