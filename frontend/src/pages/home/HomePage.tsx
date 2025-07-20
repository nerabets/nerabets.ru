import { useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import one from "/one.png"
import style from "./HomePage.module.css"
const HomePage = () => {

  useEffect(() => {
    document.title = 'nerabets | Главная';
    }, []);
    return (
      <section className={style.hero}>
        <div className={style.text_and_action}>
          <h1>Разработка лендингов под ключ</h1>
          <p>Cоздаю современные, быстрые и адаптивные лендинги, которые работают на результат. Без шаблонов, с фокусом на ваш продукт и конверсию.</p>
          <button>GO</button>
        </div>
        <div className={style.image}>
          <img src={one} alt="" />
        </div>
      </section>
    );
};

export default HomePage;