import "./globals.css";

export const metadata = {
  title: "My Portfolio",
  description: "Personal portfolio website",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
