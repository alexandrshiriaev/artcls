export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <div className="max-w-xl mx-auto mt-16 border p-16 rounded-xl">
                {children}
            </div>
        </main>
    );
}
