import testFunc from './test-func';

test( 'Prepends the word "test"', () => {
	expect( testFunc( 'foo' )).toBe( 'test foo' );
});
