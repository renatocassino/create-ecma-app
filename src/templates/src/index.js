import chalk from 'chalk';
import logger from './lib/logger';
import message from './message';

logger.info(message('world'));
logger.info(chalk.red('Love Ecma <3'));
