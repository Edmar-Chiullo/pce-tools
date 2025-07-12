import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_3s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function Loaging() {
    
    return (
        <div className={`${shimmer} flex w-full items-end p-2`}>
            <div className="flex flex-col w-[60%] p-1">
                <h1 className="self-end mr-10 text-2xl text-zinc-50"></h1>
                <div className="box-activity flex w-[100%] mt-15 flex-col justify-end gap-1">
                    <div className="flex justify-between w-full h-9">
                        <h1 className="ml-2 self-end text-zinc-50"></h1>
                        <div className="flex gap-2 w-full p-1 bg-zinc-50">
                            <Input type="text" placeholder="Insira o código" className="input-quary h-8 bg-zinc-100"/>
                            <Button className="w-20 h-8 cursor-pointer hover:scale-[1.04] bg-zinc-100"></Button>
                        </div>
                    </div>
                    <ScrollArea className="flex justify-center h-[400px] border-t-2 pl-1 pr-1">
                        <div className={`flex justify-between w-full h-14 bg-zinc-50 mt-1 rounded-sm p-2`}>
                            <div className="flex flex-col gap-1 w-full h-10 bg-zinc-100"></div>
                            <Button className="self-center w-20 h-8 text-[12px] rounded-3xl cursor-pointer hover:scale-[1.04] bg-zinc-200"></Button>
                        </div>
                        <div className={`flex justify-between w-full h-14 bg-zinc-50 mt-1 rounded-sm p-2`}>
                            <div className="flex flex-col gap-1 w-full h-10 bg-zinc-100"></div>
                            <Button className="self-center w-20 h-8 text-[12px] rounded-3xl cursor-pointer hover:scale-[1.04] bg-zinc-200"></Button>
                        </div>
                        <div className={`flex justify-between w-full h-14 bg-zinc-50 mt-1 rounded-sm p-2`}>
                            <div className="flex flex-col gap-1 w-full h-10 bg-zinc-100"></div>
                            <Button className="self-center w-20 h-8 text-[12px] rounded-3xl cursor-pointer hover:scale-[1.04] bg-zinc-200"></Button>
                        </div>
                        <div className={`flex justify-between w-full h-14 bg-zinc-50 mt-1 rounded-sm p-2`}>
                            <div className="flex flex-col gap-1 w-full h-10 bg-zinc-100"></div>
                            <Button className="self-center w-20 h-8 text-[12px] rounded-3xl cursor-pointer hover:scale-[1.04] bg-zinc-200"></Button>
                        </div>
                        <div className={`flex justify-between w-full h-14 bg-zinc-50 mt-1 rounded-sm p-2`}>
                            <div className="flex flex-col gap-1 w-full h-10 bg-zinc-100"></div>
                            <Button className="self-center w-20 h-8 text-[12px] rounded-3xl cursor-pointer hover:scale-[1.04] bg-zinc-200"></Button>
                        </div>
                        <div className={`flex justify-between w-full h-14 bg-zinc-50 mt-1 rounded-sm p-2`}>
                            <div className="flex flex-col gap-1 w-full h-10 bg-zinc-100"></div>
                            <Button className="self-center w-20 h-8 text-[12px] rounded-3xl cursor-pointer hover:scale-[1.04] bg-zinc-200"></Button>
                        </div>
                        <div className={`flex justify-between w-full h-14 bg-zinc-50 mt-1 rounded-sm p-2`}>
                            <div className="flex flex-col gap-1 w-full h-10 bg-zinc-100"></div>
                            <Button className="self-center w-20 h-8 text-[12px] rounded-3xl cursor-pointer hover:scale-[1.04] bg-zinc-200"></Button>
                        </div>
                    </ScrollArea>
                </div>
            </div>
            <div className="self-end place-items-end w-[40%] h-[450px] p-1 bg-zinc-50">
                <div className="w-32 h-8 rounded-[6px] mt-2 bg-zinc-100"></div>
            </div>
        </div>
    )
}