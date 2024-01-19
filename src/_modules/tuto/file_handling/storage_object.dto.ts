import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber, IsString } from "class-validator"

export class StorageObjectDto {
    @ApiProperty({ required: false })
    @IsString()
    comment?: string

    @ApiProperty({ type: 'string', format: 'Number', required: false })
    @Type(() => Number)
    @IsNumber()
    outletId?: number

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    file: Express.Multer.File
}