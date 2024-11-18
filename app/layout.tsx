import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={"min-h-screen max-h-screen min-w-screen max-w-screen bg-grain bg-white box-border"}>
    <div className={"z-10 relative"}>
      {children}
    </div>
    {
    /*<div className="z-1 fixed -right-[25%] -bottom-[25%] w-[50vh] h-[50vh] md:w-[75vh] md:h-[75vh] pointer-events-none bg-gradient-to-tr from-white/60 to-amber-500/60 rounded-full blur-2xl"></div>*/
    }
    </body>
    </html>
  );
}

