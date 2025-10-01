'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { setUsers } from '@/lib/firebase/server-database';
import { dateDb } from '@/utils/date-generate';
import { UserProps } from '@/app/interface/interface';
import { Bounce, ToastContainer, toast } from 'react-toastify';


type User = {
    name: string;
    email: string;
    role: string;
    center: string;
    password: string;    
}

const middleNames = (words:string[]) => {
    const meddlesNames = words.slice(1, -1);
    const initialsWords = meddlesNames
    .filter(p => p.length > 2) 
    .map(p => p[0].toUpperCase() + '.')
    .join(' ');
    
    return initialsWords
}

const firstLastName = (fullName: string) => {
    const words = fullName.split(' '); 
    const firstName = words[0]; 
    const middleName = middleNames(words)
    const lastName = words[words.length - 1]; 
    const formattedName = `${firstName} ${middleName} ${lastName}`;
    return formattedName
}

const checkPermission = (role:string) => {
    switch (role) {
        case 'operador':
            return 'pce-operation'
        case 'analista':
            return 'pce-analytics'
        case 'admin':
            return 'admin'
        default:
            break;
    }
    return ''
}

const user = (data:User) => {
    const idDoUsuario = data.email;
    const nomeDeUsuario = idDoUsuario.split('@')[0];

    const user: UserProps = {
        email: data.email,
        uid: process.env.NEXT_PUBLIC_AUTHTOKEN ?? '',
        userID: nomeDeUsuario,
        userName: firstLastName(data.name),
        userPermission: checkPermission(data.role),
        userPassword: data.password,
        userLocalWork: data.center,
        userRegistrationDate: dateDb()
    }

    return user
}

const createUserSchema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
    email: z.string().email("Formato de e-mail inválido."),
    role: z.enum(['operador', 'analista'], {
        errorMap: () => ({ message: "Selecione uma função (Operador ou Analista)." })
    }),
    center: z.string().min(1, "O centro de trabalho é obrigatório."),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type CreateUserFormData = z.infer<typeof createUserSchema>;

interface CreateUserFormProps {
    onSubmit?: (data: CreateUserFormData) => void;
}

const CreateUser: React.FC<CreateUserFormProps> = ({ onSubmit }) => {
    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors, isSubmitting } 
    } = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: '',
            email: '',
            role: 'operador',
            center: '',
            password: '',
        }
    });

    const handleFormSubmit: SubmitHandler<CreateUserFormData> = async (data) => {
        try {
            const restult = await setUsers(user(data))
            toast.success(restult, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            
            reset()
        } catch (error) {
            console.log('Não foi possivel concluir o cadastro,' + error)            
        }
    };

    return (
        <div className='lg:px-10 space-y-2'>
            <ToastContainer />
            <h1 className='text-2xl'>Cadastro de Usuário</h1>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 w-full mx-auto">
                <div>
                    <label htmlFor="name" className="block mb-1 font-medium">Nome</label>
                    <input
                        id="name"
                        type="text"
                        placeholder='Nome'
                        {...register("name")} 
                        className="w-full border px-3 py-2 rounded bg-zinc-50"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block mb-1 font-medium">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder='E-mail'
                        {...register("email")}
                        className="w-full border px-3 py-2 rounded bg-zinc-50"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                
                <div className='space-y-2'>
                    <label className='block mb-1 font-medium'>Função</label>
                    <div className='border p-2 rounded-md'>
                        <div className='flex gap-6'>
                            {/* Radio 1: Operador */}
                            <div className='flex items-center gap-2'>
                                <input
                                    id="role-operador"
                                    type="radio"
                                    value="operador" // 👈 Valor estático
                                    {...register("role")} // 🔑 Ambos devem ter o mesmo nome!
                                    className="w-4 h-4 text-zinc-900 border-gray-300"
                                />
                                <label htmlFor="role-operador" className="font-medium">Operador</label>
                            </div>
                            
                            {/* Radio 2: Analista */}
                            <div className='flex items-center gap-2'>
                                <input
                                    id="role-analista"
                                    type="radio"
                                    value="analista" // 👈 Valor estático
                                    {...register("role")} // 🔑 Ambos devem ter o mesmo nome!
                                    className="w-4 h-4 text-zinc-900 border-gray-300"
                                />
                                <label htmlFor="role-analista" className="font-medium">Analista</label>
                            </div>
                        </div>
                    </div>
                    {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                </div>

                <div>
                    <label htmlFor="center" className="block mb-1 font-medium">Centro de Trabalho</label>
                    <input
                        id="center"
                        type="text"
                        placeholder='Centro (Ex: 1046)'
                        {...register("center")}
                        className="w-full border px-3 py-2 rounded bg-zinc-50"
                    />
                    {errors.center && <p className="text-red-500 text-sm mt-1">{errors.center.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block mb-1 font-medium">Senha</label>
                    <input
                        id="password"
                        type="password"
                        placeholder='Senha'
                        {...register("password")}
                        className="w-full border px-3 py-2 rounded bg-zinc-50"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting} 
                    className={`text-zinc-50 w-full mt-6 px-4 py-2 rounded transition-colors ${
                        isSubmitting ? 'bg-zinc-600 cursor-not-allowed' : 'bg-zinc-950 hover:bg-zinc-900'
                    }`}
                >
                    {isSubmitting ? 'Aguarde...' : 'Criar Usuário'}
                </button>
            </form>
        </div>
    );
};

export default CreateUser;