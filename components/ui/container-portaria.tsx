'use client'

import { db } from '@/app/firebase/fbkey'
import { fullDate, fullDatePrint } from '@/utils/date-generate'
import { onChildAdded, onChildChanged, ref, set, update } from 'firebase/database'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
//import Timer from './span'


type UserData = {
    first: string
    session: string
    center: string
}

export default function PagePataria() {
    const [ bulk, setBulk ] = useState<any[]>([])
    const { data: session, status } = useSession()

    const user: UserData | null = useMemo(() => {
        if (session?.user?.name) {
            try {
                return JSON.parse(session.user.name) as UserData
            } catch (error) {
                console.error("Erro ao fazer parse dos dados do usuário:", error)
                return null
            }
        }
        return null
    }, [session])

    useEffect(() => {
        const strDate = fullDate().replace(/\//g, "");
        const basePath = `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${user?.center}/recebimento`;
        const cargaReceipt = ref(db, basePath)   
        onChildAdded(cargaReceipt, (snapshot) => {
            if (snapshot.exists()) {
            const arr = snapshot.val();
            const { carga } = arr;

            setBulk((prev) => {
            const exists = prev.some((item) => item.carga.bulkId === carga.bulkId);
            if (!exists) {
                return [...prev, { carga }];
            }
            return prev;
            });
            }
        });

        const alterCarga = ref(db, basePath)
        onChildChanged(alterCarga, (snapshot) => {
            if (snapshot.exists()) {
            const { carga } = snapshot.val();
            const id = carga.bulkId;
            setBulk((prev) =>
                prev.map((item) => item.carga.bulkId === id ? { carga } : item)
            );
            }
        });
        
    }, [status, user])

    function handleSearchStatus({...element}) {   
        const status = element.select === 'Confirmada' ? 'Confirmada' : 'Aguardando'
        const strDate = fullDatePrint(element.data)
        .replace('/','')
        .replace('/','')
        const pathState = `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${user?.center}/recebimento/${element.key}/carga/bulkStateEntrie`
        update(ref(db), {
            [pathState]: status  
        });
    }

    return (
        <div className='flex flex-col gap-[0.9px] w-full h-full overflow-hidden'>
            <div className="w-full bg-zinc-600 px-1 rounded-t-sm">
                <ul className="grid grid-cols-8 place-items-start gap-6 text-zinc-50">
                    <li className="col-start-1 col-end-2">Motorista</li>
                    <li className="col-start-3">Placa</li>
                    <li className="col-start-4">Controle</li>
                    <li className="col-start-5">Identificador</li>
                    <li className="col-start-6">Data</li>
                    <li className="col-start-7">Status</li>
                </ul>
            </div>
            <ScrollArea>
                {
                   bulk.map(({carga}, key) => {
                    return (
                        <div key={key} className={`flex w-full h-10 items-end mb-[1.50px] cursor-pointer rounded-zsm p-1 ${carga.bulkStateEntrie === 'Aguardando' ? 'bg-amber-300' : 'bg-green-300'} ${carga.bulkStateCpd === 'liberar canhoto' ? 'hidden' : 'none'}`}>
                            <ul className={`grid grid-cols-8 grid-rows-1 gap-6 w-full h-8 text-lg px-1`}>
                                <li className="col-start-1 col-span-2">{carga.bulkDriver.toUpperCase()}</li>
                                <li className="col-start-3">{carga.bulkPlate.toUpperCase()}</li>
                                <li className="col-start-4">{carga.bulkControl.toUpperCase()}</li>
                                <li className="col-start-5">{carga.bulkId.toUpperCase()}</li>
                                <li className="col-start-6">{fullDatePrint(carga.bulkCpdDate)}</li>
                                <li id={carga.bulkId} className="flex col-start-7 w-50">
                                    <select
                                        value={carga.bulkStateEntrie}
                                        onChange={(e) => handleSearchStatus({select: e.target.value, key: carga.bulkId, data: carga.bulkCpdDate})}
                                        className="w-full px-3 py-1 border border-gray-300 bg-gray-50 text-base rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
                                    >
                                        <option value='Confirmada'>Confirmada</option>
                                        <option value="Aguardando">Aguardando</option>
                                    </select>
                                </li>
                            </ul>
                        </div>
                    )
                    })
                }

            </ScrollArea>
        </div>
    )
}