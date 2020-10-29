/**
 * 正则
 */
export const regular = {
  /**
   * 车牌号
   */
  carNumber: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-HJ-NP-Z]{1}(?:(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))|[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})$/,

  /**
   * 手机号
   */
  phone: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,

  /**
   * 身份证
   */
  idCard: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,

  /**
   * 中文姓名
   */
  chineseName: /^(?:[\u4e00-\u9fa5·]{2,8})$/,
};

/**
 * 身份证格式校验
 * 详细写法自行查阅资料
 */
export const idCardValidator = (idCard: string) => {
  if (idCard.length === 18) {
    const weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    const seventeen = idCard.substring(0, 17);
    const num = seventeen.split('').reduce((num, i, k) => num + +i * weight_factor[k], 0);
    if (idCard[17] !== check_code[num % 11]) return false;
  }
  return regular.idCard.test(idCard);
};
