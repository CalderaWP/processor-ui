import * as CalderaComponents from '@caldera-labs/components';

/**
 * Given an array of field configurations, return array of React components for them
 *
 *
 * @param {Array}fieldConfigs
 * @return {Array<React.Component>}
 */
export const configUiFactory = (fieldConfigs) => {
	return CalderaComponents.factories.fieldSetFactory(fieldConfigs);
};
