/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';


// export const config = () => {
const typeToZh_cn = {
  number: '数字',
  string: '字符',
};

yup.setLocale({
  mixed: {
    default: '${path}混合类型错误',
    required: '${path}不可以为空哦～',
    notType: params => `${params.path}需要${typeToZh_cn[params.type as 'string'| 'number']}类型`,
  },
  number: {
    min: '${path}不可以小于${min}',
    integer: '${path}需要为整型',
    positive: '${path}需要为正数',
  },
  string: {
    length: '${path}字符长度需${length}',
    max: '${path}字符长度不可以大于${max}',
  },
});
// };
