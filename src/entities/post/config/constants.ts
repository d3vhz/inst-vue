const queryKeys = {
  all: ['posts'],
};

const STATUS = ['active', 'archived'] as const;

const CAPTION_MIN_LENGTH = 1;

export { queryKeys, STATUS, CAPTION_MIN_LENGTH };
