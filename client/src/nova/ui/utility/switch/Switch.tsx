import { cn } from "@/shared/utils/cn";

function SwitchColumn({
  switchState,
  handleSwitch,
  className,
}: {
  switchState: boolean;
  handleSwitch: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={handleSwitch}
      className={cn(
        "h-full ml-4 bg-gray-100 w-fit flex items-center rounded-md justify-start",
        className
      )}
    >
      <div className="relative h-fit flex z-10">
        <div
          className={cn(
            "transform transition-transform duration-300 absolute w-1/2 h-full rounded-md -z-10",
            switchState
              ? "bg-green-500 -translate-1/2"
              : "bg-red-500 translate-x-full"
          )}
        />
        <div
          className={cn(
            switchState && "text-white",
            "transition-all duration-300 cursor-pointer flex justify-center rounded-sm w-10 h-7 text-center leading-7 select-none px-2"
          )}
        >
          <span>Да</span>
        </div>
        <div
          className={cn(
            !switchState && "text-white",
            "transition-all duration-300 cursor-pointer flex justify-center rounded-sm w-10 h-7 text-center leading-7 select-none px-2"
          )}
        >
          <span>Нет</span>
        </div>
      </div>
    </div>
  );
}

export default SwitchColumn;
