"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const community_1 = __importDefault(require("./routes/community"));
const bookings_1 = __importDefault(require("./routes/bookings"));
const chat_1 = __importDefault(require("./routes/chat"));
const roadmaps_1 = __importDefault(require("./routes/roadmaps"));
const scholarships_1 = __importDefault(require("./routes/scholarships"));
const resources_1 = __importDefault(require("./routes/resources"));
const events_1 = __importDefault(require("./routes/events"));
const saved_1 = __importDefault(require("./routes/saved"));
const support_1 = __importDefault(require("./routes/support"));
const education_1 = __importDefault(require("./routes/education"));
const event_registrations_1 = __importDefault(require("./routes/event-registrations"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
app.use('/api/community', community_1.default);
app.use('/api/bookings', bookings_1.default);
app.use('/api/chat', chat_1.default);
app.use('/api/roadmaps', roadmaps_1.default);
app.use('/api/scholarships', scholarships_1.default);
app.use('/api/resources', resources_1.default);
app.use('/api/events', events_1.default);
app.use('/api/saved', saved_1.default);
app.use('/api/support', support_1.default);
app.use('/api/education', education_1.default);
app.use('/api/event-registrations', event_registrations_1.default);
app.get('/', (req, res) => {
    res.send('Be You API is running...');
});
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
exports.default = app;
//# sourceMappingURL=server.js.map