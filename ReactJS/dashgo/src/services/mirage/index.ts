import { createServer, Factory, Model } from 'miragejs';
import faker from 'faker';


type User = {
    name: string;
    email: string;
    created_at: string;
}

export function makeServer() {
    const server = createServer({
        models: {
            user: Model.extend<Partial<User>>({})
        },

        // factorie é utilizado para criar dados fakes em massa
        factories: {
            user: Factory.extend({
                name(i: number){
                return `User ${i + 1}`
                },
                email(){
                    return faker.internet.email().toLowerCase();
                },
                createdAt(){
                    return faker.date.recent(10);
                },
            })
        },

        seeds(server) {
            server.createList('user', 10); // Cria 10 usuarios
        },


        routes() {
            this.namespace = 'api';
            this.timing = 750; // Delay de 750ms para a chamada.

            this.get('/users');
            this.post('/users');
            
            this.namespace = '';
            this.passthrough();
        }
    })

    return server;
}