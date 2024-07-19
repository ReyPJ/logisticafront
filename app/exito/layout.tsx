export default function ExitoLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <main className="flex-grow w-full flex flex-col justify-center items-center">
                {children}
            </main>
        </div>
    );
}
