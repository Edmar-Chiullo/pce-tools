import { ReceiptProps } from "@/app/interface/interface";
import CanhotosLiberados from "@/components/ui/CanhotosLiberados";
import { getReceiptById } from "@/lib/firebase/server-database";

type Carga = {
  carga: ReceiptProps[]
}

export default async function Pege(props: {searchParams?: Promise<{query?: string}>}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    const carga:Carga[] = await getReceiptById(query);
    return (
        <div className="w-full h-full">
          <CanhotosLiberados props={Object.values(carga)} />
        </div>
    )
}
        