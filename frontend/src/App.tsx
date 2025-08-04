import PremButton from "@/components/premium-button";

function App() {
    return (
        <>
            <div className="min-w-screen min-h-screen bg-linear-to-b from-violet-800 to-neutral-900">
                <nav className="flex items-center justify-around mx-auto py-4">
                    <h1 className="text-neutral-50 font-bold text-2xl">
                        quizmaker-ai
                    </h1>
                    <div className="max-md:hidden flex flex-row gap-8">
                        <p className="text-neutral-50 text-xl font-medium hover:underline hover:cursor-pointer hover:scale-105 transition-all duration-200">
                            Features
                        </p>
                        <p className="text-neutral-50 text-xl font-medium hover:underline hover:cursor-pointer hover:scale-105 transition-all duration-200">
                            Pricing
                        </p>
                    </div>
                    <PremButton className="bg-blue-600 py-2 px-4">
                        Get Started
                    </PremButton>
                </nav>
                <main className="mt-12">
                    <h1 className="text-white text-5xl font-bold">
                        Create Questions From Content
                    </h1>
                </main>
                <footer></footer>
            </div>
        </>
    );
}

export default App;
