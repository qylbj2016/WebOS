const objToArr = obj => {
  let res = [];
  for (let prop in obj) {
    res = res.concat(obj[prop]);
  }
  return res;
};

export { objToArr };
