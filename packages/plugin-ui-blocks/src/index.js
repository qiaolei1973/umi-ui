export default api => {
  // 注册 区块的 ui
  // 以下场景不启动 ui 功能:
  // 1. ssr 时
  // 2. 非 dev 或 ui 时
  const [command] = process.argv.slice(2);
  console.log("command", command);
  if (
    process.env.UMI_UI !== "none" &&
    !api.config.ssr &&
    (command === "dev" || command === "ui")
  ) {
    require("./ui/index").default(api);
  }
};
