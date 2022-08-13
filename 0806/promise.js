// TODO:寫一個 doWork的功能  參數帶入要做的事情還有持續的時間
function doWork(job, timer) {
  // TODO:回傳 promise ()
  // promise的參數是一個executor函式
  // executor 裡面有兩個參數 (resolve, reject)  分別代表成功內容與失敗內容
  return new Promise((resolve, reject) => {
    // TODO:帶入非同步函式來代表持續的時間
    setTimeout(() => {
      // TODO:用resolve來傳出想要顯示的內容
      // .toISOString()能讓時間轉為字串
      let dt = new Date();
      resolve(`完成工作 ${job} at ${dt.toISOString()}`);
    }, timer);
    // 函式最後要寫入時間
  });
}

let dt = new Date();
// TODO:console一個開始的時間
console.log(`開始工作 at ${dt.toISOString()}`);
// 刷牙(3) => 吃早餐(5) => 寫功課(3)
let brushPromise = doWork('刷牙', 3000);
// 使用函式
brushPromise
  // 用then來接收成功資訊
  // 參數名稱隨意取，用來接收resolve傳出的內容
  // TODO:如果還有下一步再帶入函式
  // TODO:新的return要有新的then來接收成功資訊
  // TODO:catch接收失敗訊息;
  .then((data) => {
    console.log('在 promise 裡', data);
    let eatPromise = doWork('吃早餐', 5000);
    return eatPromise;
  })
  .then((data) => {
    console.log('在 promise 裡', data);
    let writePromise = doWork('寫功課', 3000);
    return writePromise;
  })
  .then((data) => {
    console.log('在 promise 裡', data);
  })
  .catch((err) => {
    console.error('在 promise 發生錯誤:', err);
  });
