'use client';

import { db } from "@/app/firebase/fbkey";
import { datePrintInt, fullDatePrint } from "@/utils/date-generate";
import { push, ref, set } from "firebase/database";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function Page() {
  
  const [jsonData, setJsonData] = useState<any>(null);
  const [listData, setListData] = useState<any[]>([])
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];   
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        try {
          const jsonData = JSON.parse(content as string);
          const dataFull = Object.values(jsonData);

          dataFull.map((item: any) => {
            const values = Object.values(item);
            values.map((subItem: any) => {
              const tasks =  Object.values(subItem);
              tasks.map((task: any) => {    
                const taskValues = Object.values(task);
                taskValues.map((taskDetail: any) => {
                  const activity = Object.values(taskDetail);
                  activity.map((act: any) => {
                    const activity = createContent(act);
                    if (activity) {
                      setListData((prevList:any) => [...prevList, activity]);
                    }
                  });
                });
              });
            });
          });

          setJsonData(jsonData);
   
        } catch (error) {
          console.error("Erro ao analisar JSON:", error);
        }

        toast.warn('Dados carregados com sucesso.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      };
      reader.readAsText(file);
    }
  }

  function pushTaskActivity(task: any, activityID: string, activityName: string) {

    const activity = {
      activityID: activityID,
      activityName: activityName,
      activityDate: task.date,
      loadProduct: task.product ?? null,
      loadAddress: task.address ?? null,
      loadQuant: task.quant ?? null,
      loadValid: task.valid ?? null
    };

    return activity;
  }

  function createContent(data: any) {
    const { activity } = data

    if (!activity.updateTask) {
      return null;
    }

    if (activity.updateTask === "no value") {
      return null
    }
    
    const content = {
      activityFinisDate: activity.activityInitDate ?? 'no value',
      activityInitDate: activity.activityInitDate ?? 'no value',
      activityLocalWork: activity.activityLocalWork ?? 'no value',
      activityName: activity.activityName ?? 'no value',
      activityState: activity.activityState ?? 'no value',
      activityUserCenter: activity.activityLocalWork.slice(7, 11) ?? 'no value',
      activityTasks: JSON.parse(activity.updateTask) ?? 'no value',
      activityUserID: activity.activityUserID ?? 'no value',
      activityUserName: activity.activtyUserName ?? 'no value',
      activityID: activity.activityID ?? 'no value',
    };

    return content;
  }

  async function handleUpload() {

    try {
      for (const activity of listData) {
        const strDate = fullDatePrint(activity.activityInitDate)
          .replace('/','')
          .replace('/','')
        await set(ref(db, `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${activity.activityUserCenter}/${activity?.activityName}/${activity?.activityID}`), {
          activity  
        });

        // for (const task of activity.activityTasks) {
        //   const activi = pushTaskActivity(task, activity.activityID, activity.activityName);
        //   const data = fullDatePrint(activi?.activityDate)
        //  .replace('/','')
        //  .replace('/','')
        //  const path = `${data.slice(4,8)}/${data.slice(2,8)}/${data.slice(0,2)}/${activity.activityUserCenter}/${activity.activityName}/${activity.activityID}/activity/activityTasks`;
        
        //   try {
        //     await push(ref(db, path, ), {
        //       activity: activi
        //     });
        //   } catch(erro) {
        //       return {
        //           success: false,
        //           message: 'Falha gravar o endereço!'
        //       };
        //   }
        // }
      }      

      return 'Dados enviados com sucesso!'

    } catch (error) {
        return 'Aldo deu errado!'
    }
  }
  return (
      <div className="p-4">
        <ToastContainer />
          <h1 className="text-2xl font-bold mb-4">JSON Data</h1>
          <div className="flex flex-col gap-4">
            <form className="flex flex-col gap-4">
              <input type="file" onChange={handleChange} accept=".json" />
            </form>
              <button onClick={handleUpload} className="bg-zinc-950 rounded-sm text-zinc-50 hover:cursor-pointer" >Enviar</button>
          </div>
      </div>
  );
}

