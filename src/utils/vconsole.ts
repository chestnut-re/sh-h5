import Vconsole from 'vconsole'
const isEnvProduction = process.env.NODE_ENV === 'production'
const vConsole = isEnvProduction ? null : new Vconsole()
export default vConsole
