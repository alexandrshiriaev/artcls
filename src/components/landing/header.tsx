import Logo from '@/components/logo';
import LandingHeaderButtons from '@/components/landing/header-btns';

export default function LandingHeader() {
    return (
        <header className="py-4">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                <Logo />
                <LandingHeaderButtons />
            </div>
        </header>
    );
}
