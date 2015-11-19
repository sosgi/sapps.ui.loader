import {Event} from 'sosgi.framework/events';
import TPL from './main.html!text';

var service;

export function start(ctx) {
    service = new Loader(ctx, new View(TPL));
    service.start();
}

export function stop(ctx) {
    service.stop();
}
service = null;
export const styles = ['main.css'];


class View{
    constructor(tpl) {
        var div = document.createElement('div');
        div.innerHTML = tpl;
        document.body.appendChild(div);
        this.$info = div.querySelector('.info');
        this.$div = div;
}
    info(msg) {
        console.log(msg);
        this.$info.innerHTML = msg;
}
    show() {
        this.$div.style.display = 'block';
}
    hide() {
        this.$div.style.display = 'none';
    }
}

class Loader{
    constructor(ctx, view) {
        this.ctx = ctx;
        this._view = view;
    }
    start() {
        this._view.show();
        this.ctx.on.bundle.add(this);
    }
    stop() {
        this._view.hide();
        this.ctx.on.bundle.remove(this);
    }
    bundleEvent(event) {
        var bundle = event.bundle;
        switch (event.type) {
            case Event.INSTALLING:
                this._view.info('Installing bundle:' + bundle.meta.location);
                break;
            case Event.INSTALLED:
                this._view.info('Installed bundle:' + bundle.meta.location);
                break;

            case Event.STARTING:
                this._view.info('Starting bundle: ' + bundle.meta.location);
                break;
            case Event.STARTED:
                this._view.info('Started bundle: ' + bundle.meta.location);
                if (['sapps.ui.main'].indexOf(bundle.meta.location) !== -1) {
                    this._view.hide();
                }
                break;
        }
    }
}
