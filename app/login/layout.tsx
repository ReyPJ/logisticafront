export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <main className="flex-grow w-full flex flex-col justify-center items-center">
                {children}
            </main>
        </div>
    );
}
