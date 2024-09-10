import { Beverage } from "@/lib/types";

export default function AdminMenuItem({ data }: { data: Beverage }) {
  return (
    <div className="flex gap-2">
      <img src={data.image} className="size-16 rounded-md" />
      <div>
        <h1 className="line-clamp-1 max-w-xl font-bold leading-none">
          {data.name}
        </h1>
        <p className="line-clamp-2 max-w-xl text-sm opacity-60">
          {data.description}
        </p>
      </div>
    </div>
  );
}
