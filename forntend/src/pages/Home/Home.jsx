import React, { useState, useEffect, useContext } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import { StoreContext } from '../../context/StoreContext';

const Home = () => {
    const [category, setCategory] = useState("All");
    const { fetchFoodList } = useContext(StoreContext);

    const handleFetchFoodList = async () => {
        await fetchFoodList();
    };

    return (
        <div>
            <Header />
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} fetchFoodList={handleFetchFoodList} />
            <AppDownload />
        </div>
    );
};

export default Home;
