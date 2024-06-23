export function GameMainTain(): JSX.Element {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="border-[3px] border-[#ffffff80] rounded-xl p-3 max-w-[80%]">
        <div className="p-3 pt-0 bg-[#333] text-center">
          <div className="mx-4 border-b-2 border-[#356492] pb-2">
            <p className="text-white text-lg">Tin nhắn hệ thống</p>
          </div>
          <span className="block text-[#ffd200] py-8 w-[320px]">Game đang bảo trì</span>
        </div>
      </div>
    </div>
  );
}
