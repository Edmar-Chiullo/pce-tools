'use client'

import { useRouter } from "next/navigation";

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem,  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { acess } from "./aceess";
import AppAuth from "./firebase/fbauth";
import { db } from "./firebase/fbkey";
import { getUser } from "./firebase/fbmethod";

import { selectApp } from "@/utils/define-app";
import { useLoginContext } from "./context/user-context";

AppAuth(acess.email, acess.password)

const formSchema = z.object({
  login: z.string().min(2, {
    message: "É nescessario inserir o usuário",
  }),
  password: z.string().min(2, {
    message: "É nescessario inserir a senha",
  }),
})

// Component Login....

export default function Login() {
  
  const { user, setUser } = useLoginContext()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: ""
    },
  })

  function navigationPage(data:any) {
    const { userID, userPermission }:any = data
    setUser(data)
    const result = selectApp(userPermission)
    return result
  }

  function onSubmit(user: z.infer<typeof formSchema>) {
    getUser(user).then((result) => {
      const values = Object.values(result)
      const acess = values.find(({ userID, userPassword }:any) => userID === user.login && String(userPassword) === user.password)
      const res = acess ? navigationPage(acess) : false
      console.log(values)
      res ? router.push(res) : alert('Usuário ou senha inválidos.')
    })    

    form.reset({
      login: '',  
      password: ''
    })
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh] space-y-20">
      <h1 className="lg:text-7xl md:text-5x1 sm:text-4xl">Login</h1>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 lg:w-[40%] md:w-[50%] smLight:w-[90%]">
          <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
              <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                  <Input placeholder="Login" className="login h-12" {...field} />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
              </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
              <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                  <Input type='password' placeholder="password" className="password h-12" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
              </FormItem>
              )}
          />
          <Button type="submit" className="w-full h-12">Entrar</Button>
          </form>
      </Form>
    </div>
  );
}
