import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import * as fs from 'fs';
import { minioConfig } from 'src/configs/configs.constant';

@Injectable()
export class FileUploadService {
    private minioClient: Minio.Client;

    constructor() {
        this.minioClient = new Minio.Client({
            endPoint: minioConfig.endPoint,
            port: parseInt(minioConfig.port),
            useSSL: false,
            accessKey: minioConfig.accessKey,
            secretKey: minioConfig.secretKey,
        });
    }

    async uploadFile(filePath: string, fileName: string): Promise<string> {
        const bucketName = minioConfig.bucket;
        const bucketExists = await this.minioClient.bucketExists(bucketName);
        if (!bucketExists) {
            await this.minioClient.makeBucket(bucketName, 'us-east-1');
        }
        await this.minioClient.fPutObject(bucketName, fileName, filePath);
        const fileUrl = `${minioConfig.endPoint}/${bucketName}/${fileName}`;
        return fileUrl;
    }
}