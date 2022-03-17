import {
    signUp, signIn, sms,
} from './validators/rules';

type MetadataObj = {[key: string]: unknown}

const getValidator = (validationName:string) => {
    const rules: MetadataObj = {
        signUp,
        signIn,
        sms,
    };
    return rules[validationName]
}

export default getValidator;