export const getValidCount = (string: string, max?: number) => {
  try {
    const number = Math.abs(Number(string));
    if (number < 1) {
      return 1;
    }

    if (max === undefined || number <= max) {
      return number;
    }

    return max;
  } catch {
    return 1;
  }
};

export const validateCount = (string: string, max?: number) => {
  const number = Number(string);
  if (max === undefined) {
    return number > 0;
  }

  return number > 0 && number <= max;
};

export const getGap = (number: number) => {
  switch (number) {
    case 3:
      return 'gap-10';
    case 2:
      return 'gap-6';
    case 1:
      return 'gap-2';
    default:
      return undefined;
  }
};

export const getId = (group: number, index: number) => `${group}-${index}`;
