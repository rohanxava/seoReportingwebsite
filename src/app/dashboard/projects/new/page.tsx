import { getClients } from "@/app/actions/client";
import { addProject } from "@/app/actions/project";
import { NewProjectForm } from "@/components/dashboard/new-project-form";

export default async function NewProjectPage() {
  const clients = await getClients();
  return (
    <div className="p-4 md:p-8">
       <NewProjectForm clients={clients} addProject={addProject} />
    </div>
  );
}
