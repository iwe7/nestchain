"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createPlatform_1 = require("../createPlatform");
const injector_1 = require("../di/injector");
const application_ref_1 = require("../application_ref");
const application_init_1 = require("../application_init");
const metadata_1 = require("../di/metadata");
exports.corePlatform = createPlatform_1.createPlatformFactory(null, 'core', [
    {
        provide: createPlatform_1.PlatformRef,
        useClass: createPlatform_1.PlatformRef,
        deps: [injector_1.Injector],
    },
    {
        provide: application_ref_1.ApplicationRef,
        useClass: application_ref_1.ApplicationRef,
        deps: [],
    },
    {
        provide: application_init_1.ApplicationInitStatus,
        useClass: application_init_1.ApplicationInitStatus,
        deps: [[new metadata_1.Inject(application_init_1.APP_INITIALIZER), new metadata_1.Optional()]],
    },
]);
