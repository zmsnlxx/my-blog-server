import _ from 'lodash';
import {Message} from 'element-ui';


/**
 * cookie解码函数
 * @param str
 * @returns {string}
 * @constructor
 */
const DecodeCookie = (str: string) => {
    let strArr;
    let strRtn: string = '';
    strArr = str.split('a');
    for (let i = _.size(strArr) - 1; i >= 0; i--) {
        // tslint:disable-next-line:no-eval
        strRtn += String.fromCharCode(eval(strArr[i]));
    }
    return strRtn;
};

const checkResp = (resp: any) => {
    if (resp && (resp.code === 0 || resp.code === 1)) {
        if (resp.data !== null) {
            return resp.data;
        }
        return resp;
    }
    Message.error(resp.data);
    return Promise.reject(resp);
};

export default {
    DecodeCookie,
    checkResp
};
