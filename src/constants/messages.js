const MESSAGES = {
  SUCCESS: 'success',
  ALREADY_EXIST: (x) => x ? `This ${x} already exist` : 'Already exist',
};

const STATUSES = {
  SUCCESS: 'success',
  FAIL: 'fail',
  DEFAULT: '',
};

const POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
};


export {
  MESSAGES,
  STATUSES,
  POSITIONS,
};