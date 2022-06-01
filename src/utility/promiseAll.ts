const myPromiseAll = promiseArray => {
  const resArray = [];
  let index = 0;
  return new Promise((resolve, reject) => {
    /**判断函数 */
    const analy = (index, length) => {
      if (index == length) {
        resolve(resArray);
      } else {
        index++;
        next();
      }
    };
    /**递归函数 */
    const next = () => {
      /**如果是promise */
      if (promiseArray[index] instanceof Promise) {
        promiseArray[index]
          .then(res => {
            resArray.push(res);
            analy(index, promiseArray.length - 1);
          })
          .catch(err => {
            /**如果有错直接reject出去 */
            reject(err);
          });
        /**如果不是promise */
      } else {
        resArray.push(promiseArray[index]);
        analy(index, promiseArray.length - 1);
      }
    };
    next();
  });
};

myPromiseAll([])
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
