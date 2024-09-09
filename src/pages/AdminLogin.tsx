import LoginForm from "@/components/auth/login-form";

export default function AdminLogin() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-100">
      <div className="w-[470px] rounded-xl bg-white p-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-lg font-bold xl:text-xl">
            Cashier or Admin Login
          </h2>
          <div className="flex w-full justify-center">
            <p className="mb-6 w-3/4 text-sm opacity-60">
              Welcome to COPYSHOP! Please log in to manage your coffee shop.
            </p>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
