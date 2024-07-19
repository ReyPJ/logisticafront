import MainNav from "../components/MainNav";

export default function PreparedLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex justify-center items-center justify-items-center h-screen">
            <div className="w-[1800px] h-[800px] border bg-gray-50 shadow rounded-lg overflow-y-scroll">
                <div>
                    <div className="sticky top-0 z-10">
                        <div className="bg-red-600 w-full h-full rounded-t-lg flex justify-center text-center">
                            <h2 className="text-md text-white p-4 md:mt-0 mt-10">YA-GO.MX</h2>
                        </div>
                        <MainNav />
                    </div>
                    {children}
                </div>
            </div>
        </main>
    );
}

