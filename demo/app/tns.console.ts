// 

declare var android: any
// import {isFunction, isArray, isString, isObject, isBoolean, isError, isNumber, map} from "lodash"
// import {isArray} from "lodash"
var application = require("application")
var colors = require("ansicolors")
var styles = require("ansistyles")



class TnsConsole {

	href: string = 'http://192.168.1.125:5337'
	platform: string = (application.android) ? '[Android]' : '[iOS]'

	constructor() {
		fetch(this.href + '/init')
	}

	public chrome(str: string, obj: any): void {

		let sendi: any = {
			str: str,
			members: '',
			properties: [],
			array: {},
		}

		let cachei = []
		let cachev = []
		sendi.members = JSON.stringify(obj, function(k, v) {
			cachei.push(k)
			if (typeof v === 'object' && v !== null) {
				if (cachev.indexOf(v) !== -1) {
					return (v.toString ? v.toString() : v)
				}
				cachev.push(v)
			}
			if (typeof v === 'function') {
				return k + "()" + v
			}
			return v
		}, 4)

		// sendi.members = map(obj, function(v, k) {
		// 	cachei.push(k)
		// 	if (typeof v === 'object' && v !== null) {
		// 		if (cachev.indexOf(v) !== -1) {
		// 			return (v.toString ? v.toString() : v)
		// 		}
		// 		cachev.push(v)
		// 	}
		// 	if (typeof v === 'function') {
		// 		return k + "()" + v
		// 	}
		// 	return v
		// })

		// console.log(colors.blue('[sendi] '), sendi)
		// console.dump(sendi)

		for (var id in obj) {
			try {
				if (typeof (obj[id]) === 'function') {
					sendi.properties.push(id + '()')
				}
				else {
					if (typeof (obj[id]) !== 'object' && cachei.indexOf(id) === -1) {
						sendi.properties.push(id + ": " + (obj[id]))
					}
				}
			} catch (err) {
				sendi.properties.push(id + ': inaccessible')
			}
		}

		// if (isArray(obj)) {
		// 	// global.tnsconsole.error('isArray(obj)', isArray(obj))
		// 	let i, len = obj.length
		// 	for (i = 0; i < len; i++) {
		// 		sendi.array[i] = obj[i]
		// 	}
		// 	// global.tnsconsole.log('sendi.array', sendi.array)
		// }

		// android.util.Log.v(obj)
		// console.log(obj)
		// console.dump(obj)

		//      global.tnsconsole.log('typeof logit', typeof logit)

		//      let is = []
		//      let vs = []

		//      if (isFunction(logit)) {
		// sendi = JSON.stringify(logit.toString())
		//      } else if (isString(logit) || isNumber(logit) || isBoolean(logit)) {
		// sendi = JSON.stringify(logit)
		//      } else if (isArray(logit)) {

		//      }

		let size: any = Object.keys(sendi.members).length
		console.dump(obj)
		// if (size <= 1000) {
		// 	console.dump(obj)
		// } else {
		// 	// console.log('\n ' + colors.blue('[CHROME] ') + '> ' + str + '\n \n')
		// 	console.log(colors.blue('[Node Inspector]'))
		// 	fetch(this.href + '/log', {
		// 		method: "POST",
		// 		headers: { "Content-Type": "application/json" },
		// 		body: JSON.stringify(sendi),
		// 	})
		// }

		cachei = null
		cachev = null
		sendi = null

	}

	private logit(type: string, args: any[]): void {
		let errs = []
		let str = '\n'
		{
			let i, len = args.length
			for (i = 0; i < len; i++) {
				let arg // cause args[i] = JSON.stringify(args[i]) would overwrite the original object
				if (typeof args[i] == 'object') {
					if (args[i] instanceof Error) {
						errs.push(args[i])
					}
					arg = JSON.stringify(args[i])
				} else if (i == 1 && typeof args[i] == 'string') {
					arg = styles.underline(args[i])
				} else {
					arg = args[i]
				}
				if (i == 0) {
					str = str + arg
				} else if (i == len - 1) {
					str = str + arg
				} else {
					str = str + arg + ' > '
				}
			}
		}
		str = str + '\n \n'
		console[type](str)
		{
			let i, len = errs.length
			for (i = 0; i < len; i++) {
				console.error(errs[i])
				console.dump(errs[i])
				this.dumpit('ERROR', errs[i])
			}
		}
	}

	public log(...args: any[]): void {
		args.unshift(colors.blue('[LOG] '))
		this.logit('log', args)
	}

	public info(...args: any[]): void {
		args.unshift(colors.green('[INFO] '))
		this.logit('info', args)
	}

	public warn(...args: any[]): void {
		args.unshift(colors.yellow('[WARN] '))
		this.logit('warn', args)
	}

	public error(...args: any[]): void {
		args.unshift(colors.red('[ERROR] '))
		if (typeof args[1] == 'string') {
			args[1] = colors.red(args[1])
		}
		this.logit('error', args)
	}

	private dumpit(def: string, obj: any): void {
		console.log('\n' + colors.green('▼ ▼ ▼ ▼  ' + styles.underline(def) + '  ▼ ▼ ▼ ▼'))
		// console.dump(obj)
		this.chrome(def, obj)
		console.log('\n' + colors.green('▲ ▲ ▲ ▲  ' + styles.underline(def) + '  ▲ ▲ ▲ ▲\n'))
	}
	public dump = this.dumpit
	public dir = this.dumpit

}

global.tnsconsole = new TnsConsole()


