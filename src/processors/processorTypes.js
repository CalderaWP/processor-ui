import emailProcessorType from './emailProcessorType';
import redirectProcessorType from './redirectProcessorType';

/**
 * The processorTypesMap
 *
 * @type {{emailProcessorType: {slug, defaultConfigFields}, redirectProcessorType: {slug; defaultConfigFields} | {REDIRECT_PROCESSOR_TYPE: string; default}}}
 */
export const processorTypes = {
	emailProcessorType,
	redirectProcessorType
};
