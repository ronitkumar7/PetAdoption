import { useState, useEffect, useMemo } from "react";
import Table from "./Table";
import { useSearchParams } from "react-router-dom";
import './style.css';

function range(start, end) {
    return [...Array(end - start + 1).keys()].map(i => i + start);
}

function to_url_params(object) {
    var result = [];
    for (const key in object) {
        if (Array.isArray(object[key])) {
            for (const value of object[key]) {
                result.push(`${key}[]=${value}`);
            }
        }
        else {
            let value = object[key];
            result.push(`${key}=${value}`);
        }
    }
    return result.join('&');
}

function Games() {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [totalPages, setTotalPages] = useState(1);
    const [ games, setGames ] = useState([]);

    const query = useMemo(() => ({
        page : parseInt(searchParams.get("page") ?? 1),
        seasons : searchParams.getAll("seasons") ?? [],
    }), [searchParams]);
    
    useEffect(() => {
        const params = to_url_params(query);
        fetch(`https://www.balldontlie.io/api/v1/games?${params}`)
        .then(response => response.json())
        .then(json => {
            setGames(json.data);
            setTotalPages(json.meta.total_pages);
        });
    }, [ query ]);

    return <>
        <div className="checkbox-group">
            <p>Seasons:</p>
            {range(2018, (new Date()).getFullYear()).map(y => y.toString()).map(year => (
                <label>
                    {year}<input type="checkbox" 
                    onChange={event => { 
                        if (event.target.checked) { 
                            setSearchParams({seasons: [...query.seasons, year], page: 1});
                        } else {
                            setSearchParams({seasons: query.seasons.filter(y => y !== year), page: 1});
                        }
                    }}
                    checked={query.seasons.includes(year)} />
                </label>
            ))}
        </div>
        <Table games={games} />
        <p>
        { query.page < totalPages
          ? <button onClick={() => setSearchParams({...query, page: query.page + 1})}>Next</button>
          : <></> }
        { query.page > 1 
          ? <button onClick={() => setSearchParams({...query, page: query.page - 1})}>Previous</button>
          : <></> }
        </p>
        <p>Page {query.page} out of {totalPages}.</p>
    </>;
}

export default Games;