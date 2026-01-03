import Image from "next/image"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="flex min-h-[111vh] w-full justify-between font-inter">
        {children}
          <div className="auth-asset">
              <div>
                  <Image src="/icons/Wealthwave.webp" alt="Auth Image" width={900} height={900}/>
              </div>
          </div>
      </main>
  );
}