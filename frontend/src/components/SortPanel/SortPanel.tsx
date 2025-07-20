import { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import style from "./SortPanel.module.css";

type SortOption = {
  value: string;
  label: string;
};

type SortDirection = "asc" | "desc" | "none";

export const SortPanel = () => {
  const [selectedOption, setSelectedOption] = useState<string>("default");
  const [sortDirection, setSortDirection] = useState<SortDirection>("none");

  const sortOptions: SortOption[] = [
    { value: "default", label: "По умолчанию" },
    { value: "name", label: "По имени" },
    { value: "date", label: "По дате" },
    { value: "price", label: "По цене" },
  ];

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    setSortDirection("none"); // Сброс направления при смене поля
  };

  const toggleSortDirection = () => {
    setSortDirection((prev) => {
      if (prev === "none") return "asc";
      if (prev === "asc") return "desc";
      return "none";
    });
  };

  const getSortIcon = () => {
    switch (sortDirection) {
      case "asc":
        return <FaSortUp className={style.sortIcon} />;
      case "desc":
        return <FaSortDown className={style.sortIcon} />;
      default:
        return <FaSort className={style.sortIcon} />;
    }
  };

  return (
    <div className={style.sortPanel}>
      <div className={style.sortField}>
        <span className={style.sortLabel}>Сортировка:</span>
        <select
          className={style.sortSelect}
          value={selectedOption}
          onChange={handleSortChange}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          className={style.sortDirectionButton}
          onClick={toggleSortDirection}
          disabled={selectedOption === "default"}
        >
          {getSortIcon()}
        </button>
      </div>
    </div>
  );
};