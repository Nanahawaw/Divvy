import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  async uploadFile(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            this.logger.error(
              `Failed to upload file to Cloudinary: ${error.message}`,
            );
            return reject(error);
          }
          resolve(result.secure_url);
        },
      );

      if (!file) {
        this.logger.error('File is missing');
        return reject(new Error('Missing file'));
      }

      const fs = require('fs');
      fs.createReadStream(file.path).pipe(uploadStream);
    });
  }
}
