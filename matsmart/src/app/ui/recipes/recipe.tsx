export function Recipe({
  title,
  imgUrl,
  timeRequired,
}: {
  title: string;
  imgUrl: string;
  timeRequired: string;
}) {
  return (
    <div className="grid-col-4 gap-4 lg:max-w-xs">
      <div className="rounded-xl bg-gray-50  shadow-sm">
        <img className="" src={imgUrl} />
        <div className="truncate rounded-xl bg-white">
          <div className="flex p-4">
            <h2 className="ml-2 text-base font-bold">{title}</h2>
          </div>
          <p className="text-sm font-medium ps-4 pb-4 ml-2">{timeRequired}</p>
        </div>
      </div>
    </div>
  );
}
