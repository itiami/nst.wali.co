import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { StorageObjectDto } from './storage_object.dto';

@Controller('file-handling')
export class FileHandlingController {

    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                comment: { type: 'string' },
                outletId: { type: 'integer' },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file', { dest: 'src/upload' }))
    // Here the FileInterceptor creates the src/upload folder create automatically
    uploadFile(
        @Body() body: StorageObjectDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        console.log({
            body: body,
            fileDetal: file
        });

    }
}
