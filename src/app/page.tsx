import { IoIosTrendingUp } from "react-icons/io";
import ratingLogo from "../../public/RatingLogo.webp"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
export default function Home() {
  const imageUrl =
    "https://image.tmdb.org/t/p/original/en3GU5uGkKaYmSyetHV4csHHiH3.jpg";
    const imageUrl2 =
      "https://image.tmdb.org/t/p/original/wOCVHXr4Ti0ZZuAMv0GGn2oOSh6.jpg";
  return (
    <div className="w-full relative">
      <img
        src={imageUrl}
        alt=""
        className="h-[400px] w-full object-cover max-sm:h-auto"
      />
      <div className=" absolute inset-0 bg-gradient-to-r from-black/30 to-black/0" />
      <div className="absolute top-4 left-10 text-white flex items-center gap-2 bg-[var(--highlight)] px-4 py-2 rounded-lg text-sm max-sm:text-xs max-sm:top-2 max-sm:left-2">
        <IoIosTrendingUp />
        Trending
      </div>
      <div className="absolute top-1/4 left-10 text-white flex flex-col gap-2 max-sm:bottom-2 max-sm:left-2">
        <div className="uppercase font-bold text-3xl max-sm:text-sm">
          Company Name
        </div>
        <div className="font-bold text-3xl max-sm:text-sm">Movie Name</div>
        <div className=" flex items-center gap-4 text-sm max-sm:text-xs">
          <div className="flex gap-2">
            <img src={ratingLogo.src} alt="" className="h-5 w-8" />
            <div>7.8</div>
          </div>
          <div>English</div>
        </div>
        <div className="mt-10 p-4 bg-[var(--highlight)] rounded-2xl w-28 text-center">
          Watch
        </div>
      </div>

      <div className="absolute bottom-4 right-8 flex gap-4">
        <FaAngleLeft
          size={1}
          className="text-white absolute cursor-pointer -left-4 top-6 bg-[var(--highlight)] rounded-full h-8 w-8"
        />
        <FaAngleRight
          size={1}
          className="text-white absolute cursor-pointer -right-4 top-6 bg-[var(--highlight)] rounded-full h-8 w-8"
        />
        <img
          src={imageUrl2}
          alt=""
          className="h-20 w-full rounded-2xl object-cover max-sm:h-auto"
        />
        <img
          src={imageUrl2}
          alt=""
          className="h-20 w-full rounded-2xl object-cover max-sm:h-auto"
        />
        <img
          src={imageUrl2}
          alt=""
          className="h-20 w-full rounded-2xl object-cover max-sm:h-auto"
        />
        <img
          src={imageUrl2}
          alt=""
          className="h-20 w-full rounded-2xl object-cover max-sm:h-auto"
        />
      </div>
    </div>
  );
}
