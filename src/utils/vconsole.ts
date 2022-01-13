import Vconsole from 'vconsole'
const isEnvProduction = process.env.NODE_ENV === 'production'
//开发环境不添加调试 否则热更新会失效
const vConsole = isEnvProduction ? new Vconsole() : null
// const vConsole = new Vconsole()
export default vConsole
