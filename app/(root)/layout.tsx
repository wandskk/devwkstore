export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-scree flex-col">
      <main className="main flex-1 wrapper">{children}</main>
    </div>
  );
}
