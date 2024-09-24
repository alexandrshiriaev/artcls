import Logo from '@/components/logo';
import HeaderBtns from '@/components/header/header-btns';

export default function Header() {
    return (
        <header className="py-4">
            <div className="container flex justify-between items-center">
                <Logo />
                <HeaderBtns />
            </div>
        </header>
    );
}
