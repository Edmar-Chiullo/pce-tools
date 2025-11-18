import { ReceiptProps } from "@/app/interface/interface";
import PagePataria from "@/components/ui/container-portaria";
import RecebimentoComponent from "@/components/ui/RecebimentoComponent";
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
          <RecebimentoComponent props={Object.values(carga)} />
      </div>
    )
}
