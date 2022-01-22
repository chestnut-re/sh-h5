import Vconsole from 'vconsole'
const isEnvProduction = process.env.NODE_ENV === 'production'
// const vConsole = isEnvProduction ? null : new Vconsole()
const vConsole = null
export default vConsole
