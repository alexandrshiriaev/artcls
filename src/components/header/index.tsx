import Logo from '@/components/logo';
import HeaderButtons from '@/components/header/header-buttons';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { privateRoutes } from '@/routes';

type HeaderProps = React.HTMLProps<HTMLDivElement>;

export default function Header(props: HeaderProps) {
    return (
        <header {...props} className={cn(['py-4 border-b', props.className])}>
            <div className="container flex justify-between items-center">
                <Link href={privateRoutes.HOME}>
                    <Logo />
                </Link>
                <HeaderButtons />
            </div>
        </header>
    );
}
