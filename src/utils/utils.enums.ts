const STATUS_TYPE = [
  { value: 'DEFAULT', text: 'Mặc định' },
  { value: 'PROCESSING', text: 'Đang tiến hành' },
  { value: 'SUCCESS', text: 'Thành công' },
  { value: 'ERROR', text: 'Lỗi' },
];
const STATUS_TYPE_ENUM = {
  DEFAULT: { name: 'DEFAULT', text: 'Mặc định', color: 'red' },
  PROCESSING: { name: 'PROCESSING', text: 'Đang tiến hành', color: 'red' },
  SUCCESS: { name: 'SUCCESS', text: 'Thành công', color: 'red' },
  ERROR: { name: 'ERROR', text: 'Lỗi', color: 'red' },
};
export { STATUS_TYPE, STATUS_TYPE_ENUM };
