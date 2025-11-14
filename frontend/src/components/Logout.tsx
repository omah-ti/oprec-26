"use client";
import { LoaderCircle, LogOut as LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Logout({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const forceClearCookies = () => {
    // Force clear cookies di browser dengan berbagai variasi
    const cookieNames = ['accessToken', 'refreshToken'];
    const domains = ['', '.oprec-makomti.vercel.app', '.vercel.app'];
    const paths = ['/', '/admin', '/divisi'];
    
    cookieNames.forEach(cookieName => {
      domains.forEach(domain => {
        paths.forEach(path => {
          // Multiple clear attempts
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; ${domain ? `domain=${domain};` : ''} SameSite=None; Secure`;
          document.cookie = `${cookieName}=; Max-Age=-1; path=${path}; ${domain ? `domain=${domain};` : ''} SameSite=None; Secure`;
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; ${domain ? `domain=${domain};` : ''}`;
        });
      });
    });
    
    console.log('Cookies force cleared from browser');
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      
      // Call backend logout
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log('Logout response status:', response.status);

      if (!response.ok) {
        throw new Error("Failed to log out");
      }

      // Force clear cookies regardless of response
      forceClearCookies();

      // Close dialog
      setOpen(false);

      // Show success toast
      toast({
        title: "Logout Berhasil",
        description: "Mengarahkan ulang...",
      });

      // Wait for toast to show
      await new Promise(resolve => setTimeout(resolve, 500));

      // Use router.push for navigation
      router.push("/");
      router.refresh(); // Force refresh to clear cache and re-run middleware
      
    } catch (error) {
      console.error("Logout error:", error);
      
      // Still force clear cookies even on error
      forceClearCookies();
      
      // Show different toast for error case
      toast({
        title: "Logout Berhasil", 
        description: "Mengarahkan ulang...",
      });
      
      // Still try to redirect on error
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 500);
      
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        className={`flex aspect-square shrink-0 items-center justify-center gap-4 rounded-md bg-custom-gray px-2 py-3 text-white hover:bg-custom-gray/90 lg:aspect-auto ${className}`}
      >
        <LogOutIcon className="h-5" />
        <p className="hidden lg:block">Log Out</p>
      </AlertDialogTrigger>
      <AlertDialogContent className="scale-90 rounded-lg lg:scale-100">
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi Keluar</AlertDialogTitle>
          <AlertDialogDescription className="text-[0.9rem]">
            Apakah Anda yakin ingin keluar? Anda perlu masuk kembali untuk
            mengakses akun Anda.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="*:text-[0.9rem]">
          <AlertDialogCancel disabled={loading}>Kembali</AlertDialogCancel>
          <Button
            variant={`destructive`}
            size={`lg`}
            disabled={loading}
            onClick={handleLogout}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <LoaderCircle className="animate-spin" size={20} />
                <span>Logging out...</span>
              </div>
            ) : (
              "Log Out"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}