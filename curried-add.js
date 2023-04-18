function curriedAdd(total) {
  let sum = 0;
 function adder(num) {
    if(!num) return sum;
    sum += num;
    return adder;
  };
  return adder(total);
};

module.exports = { curriedAdd };