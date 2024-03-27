
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ProfileFilesTypesValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const fileTypes = ["image/png", "image/jpg", "image/jpeg"]; // 500 kb

    if (!fileTypes.includes(value.profile_picture[0].mimetype)) {
      return {
        "error_type": "Validation failed",
        "error_message": "Error: the file type of " + value.profile_picture[0].fieldname + " is not an accepted file type for this upload (" + fileTypes + ")"
      };
    }
    if (!fileTypes.includes(value.banner_picture[0].mimetype)) {
      return {
        "error_type": "Validation failed",
        "error_message": "Error: the file type of " + value.banner_picture[0].fieldname + " is not an accepted file type for this upload (" + fileTypes + ")"
      };
    }

    return value;
  }
}
