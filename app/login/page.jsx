import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login - Admin Dashboard",
  description: "Accedi alla dashboard di amministrazione",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
