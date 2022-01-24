import Vconsole from 'vconsole'
const isEnvProduction = process.env.NODE_ENV === 'production'
const isInclude = window.location.host.indexOf('testtravel')
const vConsole = isInclude == -1 ? null : new Vconsole()
export default vConsole
