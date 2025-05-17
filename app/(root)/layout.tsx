import Footer from "@/components/footer";
import CheckoutSteps from "@/components/shared/checkoutSteps";
import Header from "@/components/shared/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="main flex-1 wrapper">
        <CheckoutSteps />
        {children}
      </main>
      <Footer />
    </div>
  );
}
