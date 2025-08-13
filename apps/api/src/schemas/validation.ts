import Joi from 'joi';

export const googleAuthSchema = Joi.object({
  google_token: Joi.string().required().messages({
    'any.required': 'Google token 是必需的',
    'string.base': 'Google token 必須是字串',
    'string.empty': 'Google token 不能為空',
  }),
});

export const googleCodeSchema = Joi.object({
  code: Joi.string().required().messages({
    'any.required': 'Google 授權碼是必需的',
    'string.base': 'Google 授權碼必須是字串',
    'string.empty': 'Google 授權碼不能為空',
  }),
});

export const adminLoginSchema = Joi.object({
  password: Joi.string().required().messages({
    'any.required': '密碼是必需的',
    'string.base': '密碼必須是字串',
    'string.empty': '密碼不能為空',
  }),
});

export const userLanguageSchema = Joi.object({
  language: Joi.string().valid('zh', 'en').required().messages({
    'any.required': '語言設定是必需的',
    'string.base': '語言設定必須是字串',
    'any.only': '語言設定只能是 zh 或 en',
  }),
});

export const userLoginSchema = Joi.object({
  id_token: Joi.string().required().messages({
    'any.required': 'Google id_token 是必需的',
    'string.base': 'Google id_token 必須是字串',
    'string.empty': 'Google id_token 不能為空',
  }),
});

export const stageVerifySchema = Joi.object({
  stage_id: Joi.string().required().messages({
    'any.required': '關卡 ID 是必需的',
    'string.base': '關卡 ID 必須是字串',
    'string.empty': '關卡 ID 不能為空',
  }),
  password: Joi.string().required().messages({
    'any.required': '密碼是必需的',
    'string.base': '密碼必須是字串',
    'string.empty': '密碼不能為空',
  }),
});

export const rewardClaimSchema = Joi.object({
  user_id: Joi.string().required().messages({
    'any.required': '使用者 ID 是必需的',
    'string.base': '使用者 ID 必須是字串',
    'string.empty': '使用者 ID 不能為空',
  }),
});

export const rewardStatusQuerySchema = Joi.object({
  user_id: Joi.string().optional().messages({
    'string.base': '使用者 ID 必須是字串',
  }),
});
