import React, {useEffect} from 'react';

const Home = (props) => {

    useEffect(() => {
        console.log(props);
    });
    return (
        <h1>Home !</h1>
    );
};

export default Home;
