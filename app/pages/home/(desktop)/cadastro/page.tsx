import React from "react";
import CreateUser from "./form-cadastro-usuario";

export default function CadastroPage() {
    return (
        <div className="w-full h-full lg:px-10 bg-zinc-100/80 rounded-2xl">
            <CreateUser />
        </div>
    );
}
