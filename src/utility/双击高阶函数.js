const doubleClick = (handle, countDown = 1000, n = 2) => {
  let count = 0;
  let timer = null;
  return (params) => {
    if (!timer) {
      timer = setTimeout(() => {
        count = 0;
        timer = null;
      }, countDown);
    }
    count++;
    if (count === n) {
      handle(params);
      count = 0;
      clearTimeout(timer);
      timer = null;
    }
  };
};

const a = doubleClick((params) => {
  console.log(params);
});

a(123);
