import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { TasksModule } from "./tasks/tasks.module"

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost/taskdb"), TasksModule],
})
export class AppModule {}

