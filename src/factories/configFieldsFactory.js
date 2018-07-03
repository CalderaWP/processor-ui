import {configFieldFactory} from './configFieldFactory';
import {validation} from '@caldera-labs/components';

/**
 * Prepare a collection of config fields
 *
 * Optionally merges with default config fields
 * Optionally sets values from a Map of config values
 *
 * @param {Object} configFields Config fields for processor. Indexed by config ID.
 * @param {Object} configFieldsDefaults Optional. Config field defaults for processor. Indexed by config ID.
 * @returns {Object}
 */
export const configFieldsFactory = (configFields, configFieldsDefaults = {}  ) => {
	Object.keys( configFields ).forEach( configFieldId => {
		if( configFieldsDefaults.hasOwnProperty(configFieldId)){
			configFields[configFieldId] = configFieldFactory(
				configFields[configFieldId],
				configFieldsDefaults[configFieldId]
			);

		}
	});

	Object.keys( configFieldsDefaults ).forEach( configDefaultId => {
		if( ! configFields.hasOwnProperty(configDefaultId)){
			configFields[configDefaultId] = configFieldsDefaults[configDefaultId];
		}
	});

	Object.keys( configFields ).forEach(configFieldId  => {
		configFields[configFieldId].id = configFieldId;
		configFields[configFieldId].ID = configFieldId;
		configFields[configFieldId] = validation.addAutomaticValidators(configFields[configFieldId]);
	});

	return configFields;
};
