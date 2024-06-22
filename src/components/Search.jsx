import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        navigate(`/searchlist?q=${searchTerm}`);
        setSearchTerm(""); // 검색어 입력 후 입력 필드 비우기
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <article className="search">
            <label htmlFor="searchInput">
                <LuSearch />
            </label>
            <input
                type="text"
                placeholder="Search"
                id="searchInput"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </article>
    );
};

export default Search;
