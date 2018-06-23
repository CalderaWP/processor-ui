import {
	getConfigFieldValue,
	getConfigFieldDefaultValue,
	getConfigFieldValueOrDefault,
	objectToMap,
	mapKeysToIdProperty,
	checkConfigFieldConditionals
} from './util';

describe( 'Util functions for factories', () => {
	describe( 'Config default find function', () => {
		it( 'Finds a default', () =>{
			expect( getConfigFieldDefaultValue({default:5})).toEqual(5);
		});

		it( 'Returns null when there is no  default', () =>{
			expect( getConfigFieldDefaultValue({roy:5})).toEqual(null);
		});
	});

	describe( 'Config value find function', () => {
		it( 'Finds a value', () =>{
			expect( getConfigFieldValue({value:5})).toEqual(5);
		});

		it( 'Returns null when there is no value', () =>{
			expect( getConfigFieldValue({roy:5})).toEqual(null);
		});
	});

	describe( 'Config value or default find function', () => {
		it( 'Finds a value', () =>{
			expect( getConfigFieldValueOrDefault({value:5})).toEqual(5);
		});

		it( 'Returns null when there is no value', () =>{
			expect( getConfigFieldValueOrDefault({roy:5})).toEqual(null);
		});

		it( 'Returns default when there is no value', () =>{
			expect( getConfigFieldValueOrDefault({default:5})).toEqual(5);
		});

		it( 'Returns value when there a value and a default', () =>{
			expect( getConfigFieldValueOrDefault({
				value: 5,
				default:2
			})).toEqual(5);
		});
	});

	describe( 'object to map conversion', () => {
		const field2 = {
			ID: 'fld2',
			type: 'email'
		};
		const fields = {
			fld1: {
				ID: 'fld1',
				type: 'text'
			},
			fld2: field2
		};

		const map = objectToMap( fields );
		expect( map.has( 'fld2' ) ).toBe(true);
		expect( map.get( 'fld2' ) ).toEqual(field2);
		expect( map.has( 'fld1' ) ).toBe(true);
	});


	describe( 'Adding ID props to map', () => {
		const fields = {
			fld1: {
				type: 'text'
			},
			fld2: {
				type: 'email'
			}
		};

		const map = mapKeysToIdProperty( objectToMap( fields ) );

		expect( map.get( 'fld1' ).ID ).toBe('fld1');
		expect( map.get( 'fld2' ).ID ).toEqual('fld2');
	});

	describe( 'checking conditionals', () => {
		const field4 = {
			ID: 'fld4',
			type: 'email'
		};
		it( 'returns true if no conditionals', () => {
			expect( checkConfigFieldConditionals(field4)).toBe( true );
		});
		it( 'returns true if one rule that should return true', () => {
			expect( checkConfigFieldConditionals({
				...field4,
				conditionals: [
					() => {return true;}
				]
			})).toBe( true );
		});
		it( 'returns false if one rule that should return false', () => {
			expect( checkConfigFieldConditionals({
				...field4,
				conditionals: [
					() => {return false;}
				]
			})).toBe( false );

		});
		it( 'returns false if one rule that should return true and one rule that should be false', () => {
			expect( checkConfigFieldConditionals({
				...field4,
				conditionals: [
					() => {return true;},
					() => {return false;}
				]
			})).toBe( false );

		});
		it( 'Passes values correctly', () => {
			const values = {
				a: 1,
				b:2
			};
			let testValues = null;
			checkConfigFieldConditionals({
				...field4,
				conditionals: [
					(valuesPassed) => {
						testValues = valuesPassed;
					}
				]
			},values);

			expect( testValues ).toEqual( values );
		});
	});
});