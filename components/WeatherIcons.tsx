import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiFog,
  WiThunderstorm,
} from "react-icons/wi";

const WeatherIcon = (code: number) => {
  if (code === 0) return <WiDaySunny size={100} />;
  if ([1, 2, 3].includes(code)) return <WiCloudy size={100} />;
  if ([45, 48].includes(code)) return <WiFog size={100} />;
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
    return <WiRain size={100} />;
  if ([71, 73, 75].includes(code)) return <WiSnow size={100} />;
  if ([95, 96, 99].includes(code)) return <WiThunderstorm size={100} />;
  return <WiDaySunny size={100} />;
};

export default WeatherIcon;
