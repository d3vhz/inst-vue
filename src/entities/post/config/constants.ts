const queryKeys = {
  all: ['posts'],
};

const STATUS = ['active', 'archived'] as const;

const CAPTION_MIN_LENGTH = 1;
const CAPTION_MAX_LENGTH = 200;

const IMAGES_MIN_LENGTH = 1;
const IMAGES_MAX_LENGTH = 5;

export {
  queryKeys,
  STATUS,
  CAPTION_MIN_LENGTH,
  CAPTION_MAX_LENGTH,
  IMAGES_MIN_LENGTH,
  IMAGES_MAX_LENGTH,
};
