export default function Layout({children,}: {children: React.ReactNode;}) {
  return (
    <main className="flex gap-2 min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
      {children}
    </main>
    
  );
}