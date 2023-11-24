"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResponse = void 0;
const common_1 = require("@nestjs/common");
const useResponse = () => {
    function createResponse(data, statusCode = common_1.HttpStatus.OK) {
        return { data, statusCode };
    }
    return {
        createResponse
    };
};
exports.useResponse = useResponse;
//# sourceMappingURL=useCreateResponse.js.map