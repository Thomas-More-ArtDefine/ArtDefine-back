
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ProfileFilesSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const maxSize = 500000; // 500 kb
    if (value.profile_picture[0].size > maxSize) {
      return "Error: size of " + value.profile_picture[0].fieldname + " exceeds the maximum file size (" + maxSize + ")";
    }
    if (value.banner_picture[0].size > maxSize) {
      return "Error: size of " + value.banner_picture[0].fieldname + " exceeds the maximum file size (" + maxSize + ")";
    }

    return value;
  }
}
