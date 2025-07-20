import style from "./Header.module.css"

let Header = () => {

    return(
        <header>
            <div className={style.header}>
                <div className={style.header_item}>Обо мне</div>
                <div className={style.header_item}>Мои работы</div>
                <div className={style.header_item}>Контакты</div>
            </div>
        </header>
    )
}

export default Header