import type { FormItemRule } from 'naive-ui';
import { REGEXP_SENHA, REGEXP_EMAIL } from '../composables'

interface CustomFormRules {
    password: FormItemRule[];
    email: FormItemRule[];
}

export const formRegras: CustomFormRules = {
    password: [
        { required: true, message: 'Por favor, digite a senha' },
        { pattern: REGEXP_SENHA, message: 'A senha é de 6 a 18 dígitos/caracteres/símbolos, pelo menos 2 combinações', trigger: 'input' }
    ],
    email: [
        { required: true, message: 'E-mail é obrigatório' },
        { pattern: REGEXP_EMAIL, message: 'E-mail inválido', trigger: 'blur' }
    ]
}