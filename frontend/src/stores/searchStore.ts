import { makeAutoObservable, runInAction } from "mobx";

interface HistoryViewedItem {
    id: string;
    title: string;
}

class SearchStore {
    searchQuery = ""; // Текущий запрос
    history: HistoryViewedItem[] = []; // История поиска
    isSearchBoxOpen = false; // Открыто ли окно поиска

    constructor() {
        makeAutoObservable(this);
        this.loadHistory();
    }

    // Загрузка истории из localStorage
    loadHistory = () => {
        const stored = localStorage.getItem("history_viewed");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed?.items)) {
                    this.history = parsed.items;
                }
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    };

    // Сохранение истории в localStorage
    saveHistory = () => {
        localStorage.setItem("history_viewed", JSON.stringify({ items: this.history }));
    };

    // Добавление элемента в историю
    addToHistory = (item: HistoryViewedItem) => {
        // Удаляем дубликаты (если уже есть такой id)
        this.history = this.history.filter((i) => i.id !== item.id);
        // Добавляем в начало
        this.history.unshift(item);
        // Ограничиваем историю (например, 10 последних записей)
        if (this.history.length > 10) {
            this.history = this.history.slice(0, 10);
        }
        this.saveHistory();
    };

    // Очистка истории
    clearHistory = () => {
        this.history = [];
        localStorage.removeItem("history_viewed");
    };

    // Установка поискового запроса
    setSearchQuery = (query: string) => {
        this.searchQuery = query;
    };

    // Открытие/закрытие окна поиска
    toggleSearchBox = (isOpen: boolean) => {
        this.isSearchBoxOpen = isOpen;
    };
}

export const searchStore = new SearchStore();