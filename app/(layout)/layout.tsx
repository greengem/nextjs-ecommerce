export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className='flex flex-col grow p-5'>{children}</div>;
}
