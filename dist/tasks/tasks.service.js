"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./task.entity");
const users_service_1 = require("../users/users.service");
const user_entity_1 = require("../users/user.entity");
let TasksService = class TasksService {
    constructor(tasksRepo, usersService) {
        this.tasksRepo = tasksRepo;
        this.usersService = usersService;
    }
    async create(userId, dto) {
        const user = await this.usersService.findById(userId);
        const task = this.tasksRepo.create({ ...dto, user });
        return this.tasksRepo.save(task);
    }
    async findAllForUser(user) {
        if (user.role === user_entity_1.UserRole.ADMIN) {
            return this.tasksRepo.find({ relations: ['user'] });
        }
        return this.tasksRepo.find({ where: { user: { id: user.id } }, relations: ['user'] });
    }
    async findById(id, user) {
        const task = await this.tasksRepo.findOne({ where: { id }, relations: ['user'] });
        if (!task)
            throw new common_1.NotFoundException('Task not found');
        if (user.role !== user_entity_1.UserRole.ADMIN && task.user.id !== user.id) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return task;
    }
    async update(id, dto, user) {
        const task = await this.findById(id, user);
        Object.assign(task, dto);
        return this.tasksRepo.save(task);
    }
    async remove(id, user) {
        const task = await this.findById(id, user);
        await this.tasksRepo.delete(task.id);
        return { deleted: true };
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map