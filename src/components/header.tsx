interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const dateToday = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <h1 className="font-label text-3xl font-black md:text-4xl">{title}</h1>
      <p className="text-sm opacity-60">{dateToday}</p>
    </div>
  );
}
