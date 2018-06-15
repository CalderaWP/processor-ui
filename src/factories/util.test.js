import {
	getConfigFieldValue,
	getConfigFieldDefaultValue,
	getConfigFieldValueOrDefault,
} from "./util";

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
		})
	});
})