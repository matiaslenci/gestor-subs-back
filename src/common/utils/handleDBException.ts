import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

const logger = new Logger();

export const handleDBExceptions = (error: any) => {
  if (error.code === '23505') {
    throw new BadRequestException(error.detail);
  }

  logger.error(error);

  throw new InternalServerErrorException(
    'Error inesperado, revisar server logs',
  );
};
