import LandingHeaderButtons from '@/components/landing/header-btns';

import Logo from '../ui/logo';

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
