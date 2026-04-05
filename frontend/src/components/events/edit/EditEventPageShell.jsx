export default function EditEventPageShell({ title, children }) {
  return (
    <div className="max-w-3xl bg-white mx-auto p-10 rounded-xl shadow-sm">
      {title ? <h1 className="text-2xl font-bold mb-5">{title}</h1> : null}
      {children}
    </div>
  );
}