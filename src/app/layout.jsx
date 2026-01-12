import './globals.css';

export const metadata = {
  title: 'Memory Card Game',
  description: 'Created by Anurag Yadav',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>  
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"/>
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}