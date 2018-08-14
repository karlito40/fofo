"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@loopback/rest");
const sequence_1 = require("./sequence");
/* tslint:disable:no-unused-variable */
// Binding and Booter imports are required to infer types for BootMixin!
const boot_1 = require("@loopback/boot");
// juggler imports are required to infer types for RepositoryMixin!
const repository_1 = require("@loopback/repository");
/* tslint:enable:no-unused-variable */
class FofoApiApplication extends boot_1.BootMixin(repository_1.RepositoryMixin(rest_1.RestApplication)) {
    constructor(options) {
        super(options);
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
}
exports.FofoApiApplication = FofoApiApplication;
//# sourceMappingURL=application.js.map