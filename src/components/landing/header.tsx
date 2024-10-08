import Logo from '../ui/logo';
import LandingHeaderButtons from '@/components/landing/header-btns';

export default function LandingHeader() {
    return (
        <header className="py-4">
            <div className="container flex justify-between items-center">
                <Logo />
                <LandingHeaderButtons />
            </div>
        </header>
    );
}
