class Emitter {
  constructor() {
    this.events = {};
  }

  subscribe(event, fn) {
    if(!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(fn);
  }

  emit(event, data) {
    if(this.events[event]) {
      this.events[event].forEach(fn => {
        fn(data);
      });
    }
  }
}

export default Emitter;
