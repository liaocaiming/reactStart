import isObject from './isObject';
// 过滤空的参数
export function filterEmptyValue(params: any) {
  const res: any = {};
  if (!params || (params && Object.keys(params).length === 0)) {
    return res;
  }

  Object.keys(params).forEach(key => {
    const value = params[key];
    if (value !== '' && value !== undefined && value !== null && value !== 'undefined' && value !== 'null') {
      res[key] = value;
    }
  });

  return res;
}


// 转化对象的key
export function changeObjKey(obj: any, map: any) {
  if (!map || !isObject(map) || !obj || !isObject(obj)) {
    return obj;
  }
  const res = {};
  Object.keys(obj).forEach((key: any) => {
    if (map[key]) {
      res[map[key]] = obj[key];
    } else {
      res[key] = obj[key];
    }
  });

  return res;
}


export function reactClassNameJoin(classNames: string[]) {
  if (!classNames) {
    return;
  }

  return classNames.join(' ');
}

// 将一位数组转化成二位数组
export function dyadicArray(data: any[], num: number): any[][] {
  const arr: any = [];
  if (!data || !data.length) {
    return arr;
  }
  const dataInfo = data.slice();
  while (dataInfo.length > 0) {
    arr.push(dataInfo.splice(0, num));
  }
  return arr;
}