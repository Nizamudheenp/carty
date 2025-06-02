
import toast from 'react-hot-toast';

export const showToast = (type, message) => {
  if (type === 'success') toast.success(message);
  else if (type === 'error') toast.error(message);
  else toast(message);
};
