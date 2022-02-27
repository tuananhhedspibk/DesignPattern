class Prototype {
  public primitive: any;
  public component: object;
  public circularReference: ComponentWithBackReference;

  public clone(): this {
    const clone = Object.create(this);

    clone.component = Object.create(this.component);

    // If object has nested object, change reference of nested object to
    // original object to cloned object

    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this },
    };

    return clone;
  }
}

class ComponentWithBackReference {
  public prototype;

  constructor(prototype: Prototype) {
    this.prototype = prototype;
  }
}

const clientCode = () => {
  const p1 = new Prototype();
  p1.primitive = 245;
  p1.component = new Date();
  p1.circularReference = new ComponentWithBackReference(p1);

  const p2 = p1.clone();

  if (p1.primitive === p2.primitive) {
    console.log('Primitive is THE SAME');
  } else {
    console.log('Primitive is DIFF');
  }

  if (p1.component === p2.component) {
    console.log('Component is THE SAME');
  } else {
    console.log('Component is DIFF');
  }

  if (p1.circularReference === p2.circularReference) {
    console.log('CircularReference is THE SAME');
  } else {
    console.log('CircularReference is DIFF');
  }

  if (p1.circularReference.prototype === p2.circularReference.prototype) {
    console.log('CircularReferencePrototype is THE SAME');
  } else {
    console.log('CircularReferencePrototype is DIFF');
  }
}

clientCode();
