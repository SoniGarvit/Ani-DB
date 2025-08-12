import source from "./assets/animes-rion-naruto-logo-brand-anime-transparent-background-png-clipart--comhicliparthoiza.jpg"


export default function Header(props) {
    return <header className=" flex justify-between items-center text-white text-[15px] mt-2 mb-8 sm:text-lg ">
        <div className="flex gap-1 items-center sm:gap-2 cursor-pointer" onClick={props.reset}>
            <img src={source} alt="logo" className="header-container-logo w-8 h-auto rounded-3xl" />
            <span >ANI-Db</span>
        </div>
    </header>
}