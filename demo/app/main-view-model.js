"use strict";
var observable = require("data/observable");
require("nativescript-bolts");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
        // Initialize default values.
        this._counter = 42;
        this.updateMessage();
        global.tnsconsole.dump('bolts', bolts);
        global.tnsconsole.dump('bolts.Task', bolts.Task);
        global.tnsconsole.dump('bolts.Continuation', bolts.Continuation);
        global.tnsconsole.dump('java.util.concurrent', java.util.concurrent);
        this.doSomethingAsync();
    }
    Object.defineProperty(HelloWorldModel.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (value) {
            if (this._message !== value) {
                this._message = value;
                this.notifyPropertyChange("message", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    HelloWorldModel.prototype.doSomethingAsync = function () {
        var tcs = bolts.Task.create();
        // global.tnsconsole.dump('tcs', tcs)
        tcs.setResult('HAIWDHAGIFIEF');
        global.tnsconsole.dump('tcs.getTask()', tcs.getTask());
        return tcs.getTask();
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
    };
    HelloWorldModel.prototype.updateMessage = function () {
        if (this._counter <= 0) {
            this.message = "Hoorraaay! You unlocked the NativeScript clicker achievement!";
        }
        else {
            this.message = this._counter + " taps left";
        }
    };
    HelloWorldModel.prototype.onTap = function () {
        this._counter--;
        this.updateMessage();
    };
    return HelloWorldModel;
}(observable.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=main-view-model.js.map