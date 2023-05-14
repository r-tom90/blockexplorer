import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { richEtherscan, trueNorth, alchemy } from "../assets";

const EmblaCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);
  return (
    <div className="mt-4 overflow-hidden md:my-0" ref={emblaRef}>
      <div className="flex">
        <a
          href="https://richardtom.site"
          target="blank"
          className="min-w-full flex-[0_0_100%]"
        >
          <img
            src={richEtherscan}
            alt="RichEtherscan logo"
            width="400px"
            className="rounded"
          />
        </a>
        <a
          href="https://www.truenorthhealthcoach.com"
          target="blank"
          className="min-w-full flex-[0_0_100%]"
        >
          <img
            src={trueNorth}
            alt="true north logo"
            width="400px"
            className="rounded"
          />
        </a>
        <a
          href="https://university.alchemy.com/home"
          target="blank"
          className="min-w-full flex-[0_0_100%]"
        >
          <img
            src={alchemy}
            alt="alchemy logo"
            width="400px"
            className="rounded"
          />
        </a>
        {/* <div className="min-w-full flex-[0_0_100%]">Slide 2</div>
        <div className="min-w-full flex-[0_0_100%]">Slide 3</div> */}
      </div>
    </div>
  );
};

export default EmblaCarousel;
