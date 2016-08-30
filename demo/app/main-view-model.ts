declare var java: any
declare var bolts: any
import observable = require("data/observable");
require("nativescript-bolts")
import {Bolts} from './bolts'

export class HelloWorldModel extends observable.Observable {

    private _counter: number;
    private _message: string;

    get message(): string {
        return this._message;
    }
    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange("message", value)
        }
    }

    constructor() {
        super();

        // Initialize default values.
		this._counter = 42;
		this.updateMessage();

		global.tnsconsole.dump('bolts', bolts)
		global.tnsconsole.dump('bolts.Task', bolts.Task)
		global.tnsconsole.dump('bolts.Continuation', bolts.Continuation)
		global.tnsconsole.dump('java.util.concurrent', java.util.concurrent)
		this.doSomethingAsync()

	}

	doSomethingAsync() {

		let tcs: any = bolts.Task.create()
		// global.tnsconsole.dump('tcs', tcs)
		tcs.setResult('HAIWDHAGIFIEF')

		global.tnsconsole.dump('tcs.getTask()', tcs.getTask())
		return tcs.getTask()

		// return bolts.Task.callInBackground(new java.util.concurrent.Callable(class {
		// 	call() {
		// 		console.log('HAIDHAIWHFWEG????');
		// 	}
		// }))
		// return bolts.Task.call(, bolts.Task.BACKGROUND_EXECUTOR)
		// return bolts.Task.call(new bolts.Continuation(class {
		// 	done(t) {
		// 		console.dump(t);
		// 		return t
		// 	}
		// }), bolts.Task.BACKGROUND_EXECUTOR)
		// return bolts.Task.call()
	}

    private updateMessage() {
		if (this._counter <= 0) {
			this.message = "Hoorraaay! You unlocked the NativeScript clicker achievement!";
		} else {
			this.message = this._counter + " taps left";
		}
	}

    public onTap() {
		this._counter--;
		this.updateMessage();
	}
}