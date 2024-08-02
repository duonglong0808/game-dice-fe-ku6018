'use client';

import { useAppSelector } from '@/lib';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export function SideBarHomeGame({
  openSideBar,
  setOpenSideBar,
  setOpenTransferPoint,
}: {
  openSideBar: boolean;
  setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenTransferPoint: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { userName, name } = useAppSelector((state) => state.userCurrent);

  if (!userName) {
    redirect('/error');
  }

  return openSideBar ? (
    <div
      onClick={() => setOpenSideBar(false)}
      className="fixed top-0 left-0 right-0 bottom-0 bg-[#000000b3] z-10">
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 bottom-0 right-0 w-[62%] bg-[#fffaec] text-white flex flex-col">
        <div
          onClick={() => setOpenSideBar(false)}
          className="absolute top-0 bottom-0 -left-[26px] w-[26px] h-[52px] bg-no-repeat bg-contain m-auto bg-[url(/Areas/Mobile/Images/btn_Rswitch.svg)]"></div>
        <div className="w-full border-b-[5px] border-[#e6e0d0] flex items-center">
          <div className="w-[34%] flex justify-end h-[95px]">
            <div className="flex flex-col justify-center items-end">
              <Image
                className="object-contain"
                alt="Avatar"
                src={'/Content/images/vn/icon_level1.png'}
                width={32}
                height={32}
              />
              <span className="block text-[#836634]">Đồng</span>
            </div>
          </div>
          <div className="flex-1 text-center">
            <span className=" block text-black text-base uppercase">{userName}</span>
            <span className=" block text-[#836634] text-sm">{name}</span>
          </div>
        </div>

        <div className="flex-1 flex items-center">
          <div className="flex flex-wrap px-3">
            <div className="basis-1/2 ">
              <div className="items-center h-[100px] pb-2 mx-2 flex flex-col justify-center">
                <div className="w-[43px] h-[43px] relative">
                  <div className="absolute top-[10px] left-0 right-0 bottom-0 bg-[url(/Areas/Mobile/Images/btn_betRecord_CO.svg)] mb-2 bg-no-repeat bg-center bg-[length:52%] z-[5]"></div>
                  <div className="absolute w-[43px] h-[43px] bg-[#f5edd6] rounded-full top-0 bottom-0 left-0 right-0"></div>
                </div>
                <span className="block text-sm text-black text-center mt-2">Lịch sử đặt cược</span>
              </div>
            </div>
            <div
              onClick={() => {
                setOpenSideBar(false);
                setOpenTransferPoint(true);
              }}
              className="basis-1/2 ">
              <div className="items-center h-[100px] pb-2 mx-2 flex flex-col justify-center">
                <div className="w-[43px] h-[43px] relative">
                  <div className="absolute top-[10px] left-0 right-0 bottom-0 bg-[url(/Areas/Mobile/Images/btn_transfer_CO.svg)] mb-2 bg-no-repeat bg-center bg-[length:52%] z-[5]"></div>
                  <div className="absolute w-[43px] h-[43px] bg-[#f5edd6] rounded-full top-0 bottom-0 left-0 right-0"></div>
                </div>
                <span className="block text-sm text-black text-center mt-2">
                  Chuyển khoản nhanh
                </span>
              </div>
            </div>
            <div className="basis-1/2 ">
              <div className="items-center h-[100px] pb-2 mx-2 flex flex-col justify-center">
                <div className="w-[43px] h-[43px] relative">
                  <div className="absolute top-[10px] left-0 right-0 bottom-0 bg-[url(/Areas/Mobile/Images/icon_header_set_CO.svg)] mb-2 bg-no-repeat bg-center bg-[length:52%] z-[5]"></div>
                  <div className="absolute w-[43px] h-[43px] bg-[#f5edd6] rounded-full top-0 bottom-0 left-0 right-0"></div>
                </div>
                <span className="block text-sm text-black text-center mt-2">Cài đặt Good Road</span>
              </div>
            </div>
            <div className="basis-1/2 ">
              <div className="items-center h-[100px] pb-2 mx-2 flex flex-col justify-center">
                <div className="w-[43px] h-[43px] relative">
                  <div className="absolute top-[10px] left-0 right-0 bottom-0 bg-[url(/Areas/Mobile/Images/btn_sound_CO.svg)] mb-2 bg-no-repeat bg-center bg-[length:52%] z-[5]"></div>
                  <div className="absolute w-[43px] h-[43px] bg-[#f5edd6] rounded-full top-0 bottom-0 left-0 right-0"></div>
                </div>
                <span className="block text-sm text-black text-center mt-2">Cài đặt âm lượng</span>
              </div>
            </div>
            <div className="basis-1/2 ">
              <div className="items-center h-[100px] pb-2 mx-2 flex flex-col justify-center">
                <div className="w-[43px] h-[43px] relative">
                  <div className="absolute top-[10px] left-0 right-0 bottom-0 bg-[url(/Areas/Mobile/Images/btn_rule_CO.svg)] mb-2 bg-no-repeat bg-center bg-[length:52%] z-[5]"></div>
                  <div className="absolute w-[43px] h-[43px] bg-[#f5edd6] rounded-full top-0 bottom-0 left-0 right-0"></div>
                </div>
                <span className="block text-sm text-black text-center mt-2">
                  Hướng dẫn trò chơi
                </span>
              </div>
            </div>
            <div className="basis-1/2 ">
              <div className="items-center h-[100px] pb-2 mx-2 flex flex-col justify-center">
                <div className="w-[43px] h-[43px] relative">
                  <div className="absolute top-[10px] left-0 right-0 bottom-0 bg-[url(/Areas/Mobile/Images/btn_AnchorList_CO.svg)] mb-2 bg-no-repeat bg-center bg-[length:52%] z-[5]"></div>
                  <div className="absolute w-[43px] h-[43px] bg-[#f5edd6] rounded-full top-0 bottom-0 left-0 right-0"></div>
                </div>
                <span className="block text-sm text-black text-center mt-2">
                  Danh sách yêu thích
                </span>
              </div>
            </div>
            <div className="basis-1/2 ">
              <div className="items-center h-[100px] pb-2 mx-2 flex flex-col justify-center">
                <div className="w-[43px] h-[43px] relative">
                  <div className="absolute top-[10px] left-0 right-0 bottom-0 bg-[url(/Areas/Mobile/Images/icon_Leaderboard_CO.svg)] mb-2 bg-no-repeat bg-center bg-[length:52%] z-[5]"></div>
                  <div className="absolute w-[43px] h-[43px] bg-[#f5edd6] rounded-full top-0 bottom-0 left-0 right-0"></div>
                </div>
                <span className="block text-sm text-black text-center mt-2">Xếp hạng MC</span>
              </div>
            </div>
            <div className="basis-1/2 ">
              <div className="items-center h-[100px] pb-2 mx-2 flex flex-col justify-center">
                <div className="w-[43px] h-[43px] relative">
                  <div className="absolute top-[10px] left-0 right-0 bottom-0 bg-[url(/Areas/Mobile/Images/btn_ranking_CO.svg)] mb-2 bg-no-repeat bg-center bg-[length:52%] z-[5]"></div>
                  <div className="absolute w-[43px] h-[43px] bg-[#f5edd6] rounded-full top-0 bottom-0 left-0 right-0"></div>
                </div>
                <span className="block text-sm text-black text-center mt-2">Xếp hạng % thắng</span>
              </div>
            </div>
            <div className="basis-1/2 ">
              <div className="items-center h-[100px] pb-2 mx-2 flex flex-col justify-center">
                <div className="w-[43px] h-[43px] relative">
                  <div className="absolute top-[10px] left-0 right-0 bottom-0 bg-[url(/Areas/Mobile/Images/btn_video_CO.svg)] mb-2 bg-no-repeat bg-center bg-[length:52%] z-[5]"></div>
                  <div className="absolute w-[43px] h-[43px] bg-[#f5edd6] rounded-full top-0 bottom-0 left-0 right-0"></div>
                </div>
                <span className="block text-sm text-black text-center mt-2">Hiện trường</span>
              </div>
            </div>
            <div className="basis-1/2 ">
              <div className="items-center h-[100px] pb-2 mx-2 flex flex-col justify-center">
                <div className="w-[43px] h-[43px] relative">
                  <div className="absolute top-[10px] left-0 right-0 bottom-0 bg-[url(/Areas/Mobile/Images/btn_bonus_CO.svg)] mb-2 bg-no-repeat bg-center bg-[length:52%] z-[5]"></div>
                  <div className="absolute w-[43px] h-[43px] bg-[#f5edd6] rounded-full top-0 bottom-0 left-0 right-0"></div>
                </div>
                <span className="block text-sm text-black text-center mt-2">Danh sách Jackpot</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full border-t-[5px] border-[#e6e0d0] px-3 py-6">
          <div className="flex mb-3">
            <span className="text-black text-sm w-[36%]">Xác nhận đặt cược</span>
            <div className='flex-1 ml-2 bg-[url(/Areas/Mobile/Images/VN/btn_longbg.png)] relative text-center flex items-center justify-center bg-no-repeat bg-center after:content-[""] after:absolute after:w-8  after:left-[3px] after:top-2 after:bottom-2 after:bg-[url(/Areas/Mobile/Images/btn_button.png)] after:bg-no-repeat after:bg-center after:bg-contain'>
              <span className="ml-3 text-sm">Thủ công</span>
            </div>
          </div>

          <div className="flex">
            <span className="text-black text-sm w-[36%]">Blackground Road</span>
            <div className='flex-1 ml-2 bg-[url(/Areas/Mobile/Images/VN/btn_longbg.png)] relative text-center flex items-center justify-center bg-no-repeat bg-center after:content-[""] after:absolute after:w-8  after:left-[3px] after:top-2 after:bottom-2 after:bg-[url(/Areas/Mobile/Images/btn_button.png)] after:bg-no-repeat after:bg-center after:bg-contain'>
              <span className="ml-3 text-sm">Sáng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
