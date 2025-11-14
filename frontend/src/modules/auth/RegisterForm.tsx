"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff, Info, LoaderCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormData {
  username: string;
  email: string;
  password: string;
  NIM: string;
}

const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hide, setHide] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        },
      );
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Failed to register user.");
    }
  };

  return (
    <>
      {error && <ErrorToast message={error} onClick={() => setError(null)} />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg"
      >
        <div className="space-y-2">
          <label
            className={`${errors.username && "text-red-500"}`}
            htmlFor="username"
          >
            Name
          </label>
          <input
            type="text"
            className={`w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-custom-gray-light focus:border-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-blue ${errors.username && "border border-red-500"}`}
            {...register("username", { required: true })}
            autoFocus
            autoComplete={`on`}
          />
          {errors.username && (
            <p className="flex gap-1.5 text-sm text-red-500">
              <Info size={10} className="mt-1 shrink-0" /> Name must have at
              least 1 character.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className={`${errors.email && "text-red-500"}`}
            htmlFor="email"
          >
            Email address
          </label>
          <input
            type="text"
            className={`w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-custom-gray-light focus:border-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-blue ${errors.email && "border border-red-500"}`}
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            autoComplete={`on`}
          />
          {errors.email && (
            <p className="flex gap-1.5 text-sm text-red-500">
              <Info size={10} className="mt-1 shrink-0" /> Invalid email
              address.
            </p>
          )}
        </div>

        <div className="relative space-y-2">
          <label
            className={`${errors.password && "text-red-500"}`}
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={hide ? "password" : "text"}
              className={`w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-custom-gray-light focus:border-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-blue ${errors.password && "border border-red-500"}`}
              {...register("password", {
                required: true,
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+[\]{}|\\;',./:<>?`~"-]{8,}$/,
              })}
              autoComplete="off"
            />
            <span className="absolute right-1 top-1/2 -translate-y-1/2">
              <div
                className="cursor-pointer p-2 text-custom-silver"
                onClick={() => setHide(!hide)}
              >
                {hide ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </span>
          </div>
          {errors.password && (
            <p className="flex gap-1.5 text-sm text-red-500">
              <Info size={10} className="mt-1 shrink-0" /> Password must have at
              least 8 characters and contain one number.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className={`${errors.NIM && "text-red-500"}`} htmlFor="NIM">
            NIM
          </label>
          <input
            type="text"
            className={`w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-custom-gray-light focus:border-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-blue ${errors.NIM && "border border-red-500"}`}
            {...register("NIM", {
              required: true,
              pattern: /^\d{2}\/\d{6}\/[A-Z]{2}\/\d{5}$/,
            })}
          />
          {errors.NIM && (
            <p className="flex gap-1.5 text-sm text-red-500">
              <Info size={10} className="mt-1 shrink-0" /> Invalid NIM format.
            </p>
          )}
        </div>
        <Button
          type="submit"
          variant={`white`}
          size={`lg`}
          className="mt-2 w-full text-base"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <LoaderCircle className="animate-spin" size={20} />
            </div>
          ) : (
            "Sign up"
          )}
        </Button>
      </form>
    </>
  );
};

// toast for error
const ErrorToast = ({
  message,
  onClick,
}: {
  message: string;
  onClick: () => void;
}) => {
  return (
    <div className="flex w-full max-w-sm items-center justify-between rounded-lg border-2 border-red-800 bg-red-900/30 p-4 font-medium text-custom-silver">
      <span>{message}</span>
      <X
        size={18}
        onClick={onClick}
        className="cursor-pointer text-custom-silver"
      />
    </div>
  );
};

export default RegisterForm;
