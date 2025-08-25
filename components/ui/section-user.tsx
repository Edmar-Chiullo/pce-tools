import Logout from "./logout";
import { auth } from "@/auth";

export default async function LogoutUser() {

    const session = await auth();
    const email = session?.user?.email ?? "Sem email";
    const image = session?.user?.image ?? "/default.png";

    return (
        <div className="w-full">
            <div className="flex justify-center items-center gap-2">
                <img src={image} alt={email} className="w-10 h-10 rounded-full" />
                <p className="text-sm">{email}</p>
            </div>
          <Logout />
        </div>
    );
}
