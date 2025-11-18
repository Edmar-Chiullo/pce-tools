import { ReceiptProps } from "@/app/interface/interface";
import RecebimentoConferencia from "@/components/ui/RecebimentoConferencia";
import { getReceiptById } from "@/lib/firebase/server-database";

type Carga = {
    carga: ReceiptProps[]
}

export default async function Page(props: {searchParams?: Promise<{query?: string; page?: string;}>}) {
     const searchParams = await props.searchParams;
        const query = searchParams?.query || '';
    
        const carga:Carga[] = await getReceiptById(query);
    return (
      <div className="w-full h-full">
          <RecebimentoConferencia props={Object.values(carga)} />
      </div>
    )
}
