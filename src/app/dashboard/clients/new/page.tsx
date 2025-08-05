

import { addClientUser } from "@/app/actions/client";
import { NewClientForm } from "@/components/dashboard/new-client-form";

export default function NewClientPage() {
  return (
    <div className="p-4 md:p-8">
      <NewClientForm addClientUser={addClientUser} />
    </div>
  );
}
