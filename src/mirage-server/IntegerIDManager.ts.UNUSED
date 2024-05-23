export class IntegerIDManager {
  ids: Set<number>;
  nextId: number;

  constructor() {
    this.ids = new Set();
    this.nextId = 1;
  }

  // Returns a new unused unique identifier.
  fetch() {
    let id = this.nextId++;
    this.ids.add(id);

    return id;
  }

  // Registers an identifier as used. Must throw if identifier is already used.
  set(id: number) {
    if (this.ids.has(id)) {
      throw new Error('ID ' + id + 'has already been used.');
    }

    this.ids.add(id);
  }

  // Resets all used identifiers to unused.
  reset() {
    this.ids.clear();
  }
}
