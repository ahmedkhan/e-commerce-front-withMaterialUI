import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore"
import Card from "./Card";

import "../core/css/responsive.css";
import "../core/css/ui.css";
import "../core/css/bootstrap.css";


const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });
   

    const { categories, category, search, results, searched } = data;
    
    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({ ...data, categories: data });
            }
        });
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const searchData = () => {
        // console.log(search, category);
        if (search) {
            list({ search: search || undefined, category: category }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
    };

    const searchSubmit = e => {
        e.preventDefault();
        searchData();
        
        
    };
    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        }
        if (searched && results.length < 1) {
            return `No products found`;
        }
    };

    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className="text-muted mb-4">
                    {searchMessage(searched, results)}
                </h2>
                <div className="row">
                    {results.map((product, i) => (
                        <Card key={i} product={product} />
                    ))}
                </div>
            </div>
        );
    };

    const searchForm = () => (        
            <form className="search-wrap" action="#" onSubmit={searchSubmit}>
                <div className="input-group">
                    <select className="custom-select" name="category_name">
                        <option value>All categories</option>
                        {categories.map((c, i) => (
                                    <option key={i} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                    </select>
                    <input type="text" className="form-control" style={{ width: '55%' }} placeholder="Search" onChange={handleChange("search")} />
                    <div className="input-group-append">
                        <button className="btn btn-primary " type="submit">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>
      

    );

    return (
        <div >

            {searchForm()}
           
            {searchedProducts(results)}

        </div>
    );
};

export default Search;