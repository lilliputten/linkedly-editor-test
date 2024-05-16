import { createServer, Model, Factory } from 'miragejs';
import faker from 'faker';

import { TUser } from 'src/core/types';

// @see https://miragejs.com/quickstarts/react/develop-an-app/

export function makeServer({ environment = 'test' } = {}) {
  const server = createServer({
    environment,

    factories: {
      user: Factory.extend<Partial<TUser>>({
        get firstName() {
          return faker.name.firstName();
        },
        get lastName() {
          return faker.name.lastName();
        },
        get name() {
          return faker.name.findName(this.firstName, this.lastName);
        },
        get streetAddress() {
          return faker.address.streetAddress();
        },
        get cityStateZip() {
          return faker.fake('{{address.city}}, {{address.stateAbbr}} {{address.zipCode}}');
        },
        get phone() {
          return faker.phone.phoneNumber();
        },
        get username() {
          return faker.internet.userName(this.firstName, this.lastName);
        },
        get password() {
          return faker.internet.password();
        },
        get email() {
          return faker.internet.email(this.firstName, this.lastName);
        },
        get avatar() {
          return faker.internet.avatar();
        },
      }),
    },
    models: {
      // user: Model,
      user: Model.extend<Partial<TUser>>({}),
    },

    // seeds(server) {
    //   server.create('user', { name: 'Bob' });
    //   server.create('user', { name: 'Alice' });
    // },
    seeds(server) {
      server.createList('user', 2);
    },

    // routes() {
    //   this.namespace = 'api';
    //
    //   this.get('/users', (schema) => {
    //     return schema.users.all();
    //   });
    // },

    routes() {
      this.namespace = 'api';

      this.get('user');
    },
  });

  return server;
}
