import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          "min-h-screen max-h-screen min-w-screen max-w-screen bg-grain bg-white box-border"
        }
      >
        <div className={"z-10 relative"}>{children}</div>
      </body>
    </html>
  );
}
