interface ITarget {
  request(): string;
}

class Target implements ITarget {
  public request(): string {
    return 'Target: The default target\'s behavior.';
  }
}

class Service {
  public specificRequest(): string {
    return '.ecivreS eht fo roivaheb laicepS';
  }
}

class Adapter implements ITarget {
  private adaptee: Service;

  constructor(adaptee: Service) {
    this.adaptee = adaptee;
  }

  public request(): string {
    const result = this.adaptee.specificRequest().split('').reverse().join('');
    return `Adapter: (TRANSLATED) ${result}`;
  }
}

function clientCode(target: Target) {
  console.log(target.request());
}

console.log('Client: I can work just fine with the Target objects:');
const target = new Target();
clientCode(target);

console.log('');

const service = new Service();
console.log('Client: The Service class has a weird interface. See I don\'t understand it.');
console.log(`Service: ${service.specificRequest()}`);

console.log('');

console.log('Client: But I can work with it via the Adapter:');
const adapter = new Adapter(service);
clientCode(adapter);
