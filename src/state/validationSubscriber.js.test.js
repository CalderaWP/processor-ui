import {validation} from '@caldera-labs/components';

describe( 'import of validation', () => {
	it( 'Is an object', () => {
		expect( typeof validation ).toEqual( 'object' );
	});
	it( 'Has the config fields validator', () => {
		expect( typeof validation.checkValidatorsForConfigFields ).toEqual( 'function' );
	});
	it( 'Has addAutomaticValidators', () => {
		expect( typeof validation.addAutomaticValidators ).toEqual( 'function' );
	});
});