
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { LoaderCircle, Upload } from 'lucide-react';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      Save Logo
    </Button>
  );
};

interface UploadLogoDialogProps {
  adminId: string;
  updateAdminLogo: (prevState: any, formData: FormData) => Promise<any>;
}

export function UploadLogoDialog({
  adminId,
  updateAdminLogo,
}: UploadLogoDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [state, formAction] = useActionState(updateAdminLogo, null);

  useEffect(() => {
    if (state?.success) {
      toast({
        title: 'Success',
        description: state.message,
      });
      setOpen(false);
    } else if (state?.message) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-primary">
          Change logo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Your Logo</DialogTitle>
          <DialogDescription>
            Enter the URL for your new logo. Make sure it's accessible online.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="logoUrl" className="text-right">
                Logo URL
              </Label>
              <Input
                id="logoUrl"
                name="logoUrl"
                className="col-span-3"
                placeholder="https://example.com/logo.png"
                required
              />
               <input type="hidden" name="adminId" value={adminId} />
            </div>
             {state?.errors?.logoUrl && <p className="col-span-4 text-sm font-medium text-destructive text-right">{state.errors.logoUrl}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
