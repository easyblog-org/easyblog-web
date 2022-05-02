/***********************************************************************************
 * Copyright (c) 2019-2022 EasyBlog and/or its affiliates. All rights reserved.
 *
 * EASYBLOG UI GLOBAL JavaScript File
 ************************************************************************************/

/**
 * 全局系统默认配置
 * @type {{domain: string, base_url: string, login_token_key: string}}
 */
export const SYSTEM_CONSTANTS = {
  base_url: 'localhost:8080',
  domain: 'www.easyblog.top',
  login_token_key: 'login_token'
}

/**
 * 全局分页参数
 * @type {{ONE_HUNDRED_ITEMS: number, TEN_ITEMS: number, DEFAULT: number, TWENTY_ITEMS: number, FIFTY_ITEMS: number}}
 */
export const PAGE_SIZE = {
  DEFAULT: 10,
  TEN_ITEMS: 10,
  TWENTY_ITEMS: 20,
  FIFTY_ITEMS: 50,
  ONE_HUNDRED_ITEMS: 100
}
