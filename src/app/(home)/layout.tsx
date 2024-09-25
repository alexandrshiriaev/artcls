import Header from '@/components/header';

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <>
            <Header className="mb-4" />
            {children}
        </>
    );
}
