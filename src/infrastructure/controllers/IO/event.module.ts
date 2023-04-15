import { Module } from "@nestjs/common";
import { IOevents } from "src/useCases/IO/io.events";

@Module({
  providers: [IOevents],
})
export class IOModule { };
