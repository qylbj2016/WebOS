const getCurTime = () => {
  let min = new Date().getMinutes();
  min < 10 ? (min = `0${min}`) : "";
  return {
    time: `${new Date().getHours()}:${min}`,
    date: new Date().toLocaleDateString()
  };
};
const formatDate = date => {
  const temp = date.split("/");
  return `${temp[0]}年${temp[1]}月${temp[2]}日`;
};
const formatTime = t => {
  let h = Number.parseInt(t / 3600),
    m = Number.parseInt((t % 3600) / 60),
    s = Number.parseInt(t % 60);
  return `${h}h:${m < 10 ? "0" + m : m}m:${s < 10 ? "0" + s : s}s`;
};

export { getCurTime, formatDate, formatTime };
