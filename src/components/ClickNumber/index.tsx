export function ClickNumberBox({
  onChangeValue,
  value,
}: {
  onChangeValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}): JSX.Element {
  return (
    <div className="mb-1 text-center cursor-pointer grid grid-cols-6 border-b-[1px] border-r-[1px] border-[#2682d5]">
      <div
        onClick={(e) => onChangeValue((pre) => String(pre + 1))}
        className="py-2 bg-white  text-3xl text-[#2682d5] border-l-[1px] border-t-[1px] border-[#2682d5]">
        1
      </div>
      <div
        onClick={(e) => onChangeValue((pre) => String(pre + 2))}
        className="py-2 bg-white text-3xl text-[#2682d5] border-l-[1px] border-t-[1px] border-[#2682d5]">
        2
      </div>
      <div
        onClick={(e) => onChangeValue((pre) => String(pre + 3))}
        className="py-2 bg-white text-3xl text-[#2682d5] border-l-[1px] border-t-[1px] border-[#2682d5]">
        3
      </div>
      <div
        onClick={(e) => onChangeValue((pre) => String(pre + 4))}
        className="py-2 bg-white text-3xl text-[#2682d5] border-l-[1px] border-t-[1px] border-[#2682d5]">
        4
      </div>
      <div
        onClick={(e) => onChangeValue((pre) => String(pre + 5))}
        className="py-2 bg-white text-3xl text-[#2682d5] border-l-[1px] border-t-[1px] border-[#2682d5]">
        5
      </div>
      <div
        onClick={(e) =>
          onChangeValue((pre) => {
            if (pre) return pre.slice(0, -1);
            else return '';
          })
        }
        className="py-2 bg-white text-3xl text-[#2682d5] border-l-[1px] border-t-[1px] border-[#2682d5] bg-[url(/Areas/Mobile/Images/btn_arrowCRB.svg)] bg-[center] bg-[length:25px_86px] bg-no-repeat w-full h-full"></div>
      <div
        onClick={(e) => onChangeValue((pre) => String(pre + 6))}
        className="py-2 bg-white text-3xl text-[#2682d5] border-l-[1px] border-t-[1px] border-[#2682d5]">
        6
      </div>
      <div
        onClick={(e) => onChangeValue((pre) => String(pre + 7))}
        className="py-2 bg-white text-3xl text-[#2682d5] border-l-[1px] border-t-[1px] border-[#2682d5]">
        7
      </div>
      <div
        onClick={(e) => onChangeValue((pre) => String(pre + 8))}
        className="py-2 bg-white text-3xl text-[#2682d5] border-l-[1px] border-t-[1px] border-[#2682d5]">
        8
      </div>
      <div
        onClick={(e) => onChangeValue((pre) => String(pre + 9))}
        className="py-2 bg-white text-3xl text-[#2682d5] border-l-[1px] border-t-[1px] border-[#2682d5]">
        9
      </div>
      <div
        onClick={(e) => onChangeValue((pre) => String(pre + 0))}
        className="py-2 bg-white col-span-2 text-3xl text-[#2682d5] border-l-[1px] border-t-[1px] border-[#2682d5]">
        0
      </div>
    </div>
  );
}
