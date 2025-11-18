import { ReceiptProps } from "@/app/interface/interface";
import UpdateCarga from "@/components/ui/UpdateCarga";
import { getReceiptById } from "@/lib/firebase/server-database";

type Carga = {
  carga: ReceiptProps
}

export default async function PegeResponse(props: { params: Promise<{ id: string }> }) {
    const searchParams = await props.params;
    const id = searchParams?.id || '';
    
    const carga:Carga = await getReceiptById(id)

    return (
        <>
            <UpdateCarga props={carga} />
        </>
    )
}
        