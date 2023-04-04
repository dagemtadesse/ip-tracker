import { useRef, useEffect, useState } from "react";
import { Map, Marker } from "pigeon-maps";
import Head from "next/head";

export default function Home() {
  const header = useRef<HTMLDivElement>(null);

  const [ip, setIp] = useState("51.159.197.229");
  const [mapHeight, setMapHeight] = useState(0);
  const [data, setData] = useState<any | null>(null);

  const loadInfo = (e?: any) => {
    e && e.preventDefault();
    fetch(`https://ipapi.co/${ip}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setData({
          ip: data.query,
          location: `${data.city}, ${data.country}`,
          timezone: data.timezone,
          isp: data.isp,
          lat: data.lat,
          lng: data.lon,
        });
      });
  };

  useEffect(() => {
    if (window && header) {
      setMapHeight(window.innerHeight - (header.current?.clientHeight || 0));
    }
  }, [header]);

  const loc = data ? [Number(data.lat), Number(data.lng)] : [0, 0];

  return (
    <>
      <Head>
        <title>Ip Tracker</title>
      </Head>

      <header
        className="py-8 bg-red bg-hero-image-mobile md:bg-hero-image-desktop font-rubrick  relative pb-[128px] px-6 md:max-h-[280px] max-h-[300px] absolute z-50"
        ref={header}
      >
        <div className="flex flex-col items-center">
          <h2 className="text-white text-2xl">IP Address Tracker</h2>

          <form
            onSubmit={loadInfo}
            className="bg-white rounded-xl overflow-hidden flex items-center w-full max-w-xl mt-6 mb-6 mb:mb-10"
          >
            <input
              placeholder="Search for any IP address or domain"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="bg-transparent outline-none text-sm p-5 md:w-[500px] grow"
            />
            <button className="p-5 bg-dark text-white" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-chevron-right"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </form>

          <div className="bg-white drop-shadow-2xl p-8  max-w-5xl w-full rounded-xl mx-auto flex flex-col md:flex-row gap-7">
            <HeaderItem
              title="IP Address"
              value={data?.ip || "192.168.1.2"}
              isFirst
            />
            <HeaderItem
              title="location"
              value={data?.location || "Brooklyn, NY"}
            />
            <HeaderItem
              title="time zone"
              value={data?.timezone || "UTC-5:00"}
            />
            <HeaderItem title="isp" value={data?.isp || "SpaceX"} />
          </div>
        </div>
      </header>

      <main className="300 w-full bg-green-400" id="map">
        <Map height={mapHeight} center={loc as any} defaultZoom={5}>
          <Marker width={50} anchor={loc as any}>
            <img src="icon-location.svg" />
          </Marker>
        </Map>
      </main>
    </>
  );
}

const HeaderItem = ({
  title,
  value,
  isFirst,
}: {
  title: string;
  value: string;
  isFirst?: boolean;
}) => {
  return (
    <div
      className={`font-bold  md:pl-9 after:absolute after:top-[10%] after:left-0 after:h-[60%] ${
        !isFirst ? "md:after:border-l-darkGray md:after:border-l" : ""
      } after:text-darkGray relative grow text-center md:text-start`}
    >
      <h2 className="uppercase tracking-wider text-darkGray font-medium text-xs md:text-sm">
        {title}
      </h2>
      <p className="mt-1 md:mt-3 text-xl md:text-2xl">{value}</p>
    </div>
  );
};

const Separator = () => {
  return <div className="border-r border-r-darkGray"></div>;
};
