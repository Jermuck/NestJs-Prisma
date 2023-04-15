import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.connect";


@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule { };
