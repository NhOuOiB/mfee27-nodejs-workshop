function doWork(job, timer, cb) {
  setTimeout(() => {
    let dt = new Date();
    cb(null, `完成工作${job} at ${dt.toISOString()}`);
  }, timer);
}
let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);
doWork('刷牙', 3000, function (err, data) {
  if (err) {
    console.error('發生錯誤了', err);
  } else {
    console.log('執行成功', data);
  }
  doWork('吃早餐', 5000, function (err, data) {
    if (err) {
      console.error('發生錯誤了', err);
    } else {
      console.log('執行成功', data);
    }
    doWork('寫功課', 3000, function (err, data) {
      if (err) {
        console.error('發生錯誤了', err);
      } else {
        console.log('執行成功', data);
      }
    });
  });
});
