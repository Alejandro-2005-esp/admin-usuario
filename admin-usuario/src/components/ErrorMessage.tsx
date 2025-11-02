export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <div className="text-red-600 p-2 bg-red-50 rounded">{children}</div>
}
