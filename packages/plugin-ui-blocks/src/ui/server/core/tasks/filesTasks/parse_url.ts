import assert from 'assert';
import { IApi, utils } from 'umi';
import chalk from 'chalk';
import { join } from 'path';
import { existsSync } from 'fs';
import getNpmRegistry from 'getnpmregistry';

import { IFlowContext, IAddBlockOption, ICtxFilesTypes } from '../../types';

const { lodash, createDebug } = utils;

const debug = createDebug('umiui:UmiUI:block:tasks');

/**
 * 解析 url，
 * @param ctx
 * @param args
 */
export default async (ctx: IFlowContext, args: IAddBlockOption) => {
  const { files } = args;
  // ctx.logger.setId(url); // 设置这次 flow 的 log trace id
  ctx.result.files = files; // 记录当前的 url

  assert(files, `run ${chalk.cyan.underline('umi help block')} to checkout the usage`);
  const { config, cwd } = ctx.api;
  const blockConfig: {
    npmClient?: string;
  } = config.block || {};

  const useYarn = existsSync(join(cwd, 'yarn.lock'));
  const defaultNpmClient = blockConfig.npmClient || (useYarn ? 'yarn' : 'npm');
  const registryUrl = await getNpmRegistry();
  const blockCtx: ICtxFilesTypes = {
    ...args,
    npmClient: args.npmClient || defaultNpmClient,
  };

  debug('blockCtx', blockCtx);

  ctx.stages.blockCtx = blockCtx;
  ctx.stages.registry = args.registry || registryUrl;
};
