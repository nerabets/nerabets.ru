import { useEffect, useRef, useState } from "react";
import style from "./SearchBar.module.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

interface HistoryViewedItem {
    id: string;
    title: string;
}

interface HistoryViewed {
    items: HistoryViewedItem[];
}

const SearchBar = () => {
    const [searchBox, setSearchBox] = useState(false);
    const [historyViewed, setHistoryViewed] = useState<HistoryViewed>({ items: [{"id" : "1", "title" : "sdgsdgsdgsdg"}] });
    const boxarena = useRef<HTMLDivElement>(null);
    const [searchValue, setSearchValue] = useState("")


    const changeValueHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    // useEffect(() => {
    //     try {
    //         const stored = localStorage.getItem("history_viewed");
    //         if (stored) {
    //             const parsed = JSON.parse(stored);
    //             if (parsed?.items && Array.isArray(parsed.items)) {
    //                 setHistoryViewed(parsed);
    //             }
    //         }
    //     } catch (e) {
    //         console.error("Failed to parse history_viewed", e);
    //     }
    // }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (boxarena.current && !boxarena.current.contains(e.target as Node)) {
                setSearchBox(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleClearHistory = () => {
        setHistoryViewed({ items: [] });
        localStorage.removeItem("history_viewed");
    };

    return (
        <div ref={boxarena} className={style.search_bar__container}>
            <div className={style.search_bar__field}>
                <div className={style.search_bar__input__arena}>
                    <input 
                        type="search" 
                        placeholder="Укажите ID заказа для отслеживания заказа"
                        className={style.search_bar_input}
                        onFocus={() => setSearchBox(true)}
                        value={searchValue}
                        onChange={(e) => changeValueHandle(e)}
                    />
                </div>
                <button className={style.search_bar_button}>
                    <FaSearch />
                </button>
            </div>

            {searchBox && (
                <div className={style.search_bar__box}>
                    {/* Тут типа результаты поиска должны быть */}
                    {searchValue.length > 2 && (
                    <div className={style.search_bar__history_search_container}>
                        <div className={style.search_bar__history_search__header}>
                            <div>Результаты поиска</div>
                        </div>
                    </div>
                    )}
                    {/* end */}
                    {historyViewed.items.length > 0 && (
                        <div className={style.search_bar__history_search_container}>
                            <div className={style.search_bar__history_search__header}>
                                <div>Вы недавно смотрели</div>
                                <small onClick={handleClearHistory}>Очистить</small>
                            </div>
                            <div className={style.search_bar__history_search_item_list}>
                                {historyViewed.items.map((item) => (
                                    <Link 
                                        to={`/item/${item.id}`} 
                                        className={style.search_bar__history_search_item} 
                                        key={item.id}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;