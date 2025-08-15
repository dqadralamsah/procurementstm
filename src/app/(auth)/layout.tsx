export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full bg-white shadow rounded-lg max-w-md">{children}</div>
    </div>
  );
}
