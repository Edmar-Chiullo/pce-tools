import Link from "next/link"

export default function Page() {
  return (
    <section className="flex items-center bg-gray-100">
        <div className="flex items-end text-center w-70 h-screen px-6 py-4">
            <Link href="/pages/login" className="w-full">
                <button className="h-10 w-full bg-zinc-950 text-white rounded">Login</button>
            </Link>
        </div>
        <div className="flex flex-col justify-center w-full h-screen text-center">
            <h1 className="text-4xl font-bold">Welcome to the PCE Tools</h1>
            <p className="text-lg">Your one-stop solution for all PCE-related tasks.</p>
        </div>
    </section>
  )
}