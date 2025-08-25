import LogoutUser from "@/components/ui/section-user";

export default async function Page() {
  return (
    <section className="flex items-center min-h-screen bg-gray-100">
        <div className="flex items-end text-center h-screen w-70 p-2">
          <LogoutUser />
        </div>
        <div className="w-full text-center">
            <h1 className="text-4xl font-bold">Welcome to the PCE Tools</h1>
            <p className="text-lg">Your one-stop solution for all PCE-related tasks.</p>
        </div>
    </section>
  )
}