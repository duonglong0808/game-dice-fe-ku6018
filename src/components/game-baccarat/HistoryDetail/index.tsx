export function HistoryDetailBaccarat({ baccaratId }: { baccaratId: number }): JSX.Element {
  return (
    <div className="border-[1px] border-[#979797] w-[78px] bg-white font-semibold flex flex-col text-[15px] [&_div]:flex [&_div]:justify-between [&_div]:items-center">
      <div className="border-b-[1px] border-[#979797] text-[#db1002] px-1">
        <span>Cái</span>
        <span>3</span>
      </div>
      <div className="border-b-[1px] border-[#979797] text-[#0403cb] px-1">
        <span>Con</span>
        <span>3</span>
      </div>
      <div className="border-b-[1px] border-[#979797] text-[#339700] px-1">
        <span>Hòa</span>
        <span>3</span>
      </div>
      <div className="items-center border-b-[1px] border-[#979797] text-[#db1002] px-1">
        <span className="block bg-[url(/Content/Images/icon_s6.svg)] bg-no-repeat w-[14px] h-[14px] bg-contain"></span>
        <span>3</span>
      </div>
      <div className="border-b-[1px] border-[#979797] text-[#db1002] px-1">
        <span>Đôi</span>
        <span>3</span>
      </div>
      <div className="border-b-[1px] border-[#979797] text-[#0403cb] px-1">
        <span>Đôi</span>
        <span>3</span>
      </div>
      <div className="text-[#d98500] px-1">
        <span>Tổng</span>
        <span>12</span>
      </div>
    </div>
  );
}
