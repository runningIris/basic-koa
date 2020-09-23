const Koa = require("./koa");
const PORT = 3000;

const app = new Koa();

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(4);
});

app.use(async (ctx, next) => {
  console.log(2);
  await next();
  console.log(3);
});
