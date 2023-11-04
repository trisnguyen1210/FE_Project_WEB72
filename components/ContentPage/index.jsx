import { useState, useEffect } from 'react';
import { apiV3Discover, apiV3TotalMovie } from '../../src/apis/tmdb';
import { useParams } from 'react-router-dom';
import { Card } from 'antd';


const ContentPage = () => {
    const [movieArrays, setMovieArrays] = useState(null);
    const [totalPage, setTotalPage] = useState(1);
    let { pageId } = useParams();
    // let page = parseInt(pageId) || 1;

    async function setTotalMovie() {
        const totalMovie = await apiV3TotalMovie();
        setTotalPage(parseInt(totalMovie.total_pages));
    }
    setTotalMovie();

    useEffect(() => {
        async function setMovieArr() {
            const movieArr = await apiV3Discover(pageId);
            setMovieArrays(movieArr.results);
        }
        setMovieArr();
    }, [pageId]);


    console.log(movieArrays)
    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {movieArrays?.map(item => {
                    return (
                        <Card hoverable key={item?.id} style={{ width: '23%' }} title={item?.original_title}  cover={<img src={`https://image.tmdb.org/t/p/w342${item?.poster_path}`}/>}>
                        </Card> 
                    )

                })}
            </div>
        </>

    )
};
export default ContentPage;