import dump from "./dump";
import equiv from "./equiv";
import { internalStop } from "./test";
import { console } from "./globals";

import config from "./core/config";
import { objectType, objectValues } from "./core/utilities";
import { sourceFromStacktrace } from "./core/stacktrace";

class Assert {
	constructor( testContext ) {
		this.test = testContext;
	}

	// Assert helpers

	// Specify the number of expected assertions to guarantee that failed test
	// (no assertions are run at all) don't slip through.
	expect( asserts ) {
		if ( arguments.length === 1 ) {
			this.test.expected = asserts;
		} else {
			return this.test.expected;
		}
	}

	// Put a hold on processing and return a function that will release it a maximum of once.
	async( count ) {
		let test = this.test,
			popped = false,
			acceptCallCount = count;

		if ( typeof acceptCallCount === "undefined" ) {
			acceptCallCount = 1;
		}

		test.usedAsync = true;
		let resume = internalStop( test );

		return function done() {
			if ( popped ) {
				test.pushFailure( "Too many calls to the `assert.async` callback",
					sourceFromStacktrace( 2 ) );
				return;
			}

			acceptCallCount -= 1;
			if ( acceptCallCount > 0 ) {
				return;
			}

			popped = true;
			resume();
		};
	}

	// Exports test.push() to the user API
	// Alias of pushResult.
	push( result, actual, expected, message, negative ) {
		console.warn( "assert.push is deprecated and will be removed in QUnit 3.0." +
			" Please use assert.pushResult instead (http://api.qunitjs.com/pushResult/)." );

		let currentAssert = this instanceof Assert ? this : config.current.assert;
		return currentAssert.pushResult( {
			result,
			actual,
			expected,
			message,
			negative
		} );
	}

	pushResult( resultInfo ) {

		// Destructure of resultInfo = { result, actual, expected, message, negative }
		let assert = this,
			currentTest = ( assert instanceof Assert && assert.test ) || config.current;

		// Backwards compatibility fix.
		// Allows the direct use of global exported assertions and QUnit.assert.*
		// Although, it's use is not recommended as it can leak assertions
		// to other tests from async tests, because we only get a reference to the current test,
		// not exactly the test where assertion were intended to be called.
		if ( !currentTest ) {
			throw new Error( "assertion outside test context, in " + sourceFromStacktrace( 2 ) );
		}

		if ( currentTest.usedAsync === true && currentTest.semaphore === 0 ) {
			currentTest.pushFailure( "Assertion after the final `assert.async` was resolved",
				sourceFromStacktrace( 2 ) );

			// Allow this assertion to continue running anyway...
		}

		if ( !( assert instanceof Assert ) ) {
			assert = currentTest.assert;
		}

		return assert.test.pushResult( resultInfo );
	}

	ok( result, message ) {
		if ( !message ) {
			message = result ?
				"okay" :
				`failed, expected argument to be truthy, was: ${dump.parse( result )}`;
		}

		this.pushResult( {
			result: !!result,
			actual: result,
			expected: true,
			message
		} );
	}

	notOk( result, message ) {
		if ( !message ) {
			message = !result ?
				"okay" :
				`failed, expected argument to be falsy, was: ${dump.parse( result )}`;
		}

		this.pushResult( {
			result: !result,
			actual: result,
			expected: false,
			message
		} );
	}

	equal( actual, expected, message ) {

		// eslint-disable-next-line eqeqeq
		let result = expected == actual;

		this.pushResult( {
			result,
			actual,
			expected,
			message
		} );
	}

	notEqual( actual, expected, message ) {

		// eslint-disable-next-line eqeqeq
		let result = expected != actual;

		this.pushResult( {
			result,
			actual,
			expected,
			message,
			negative: true
		} );
	}

	propEqual( actual, expected, message ) {
		actual = objectValues( actual );
		expected = objectValues( expected );

		this.pushResult( {
			result: equiv( actual, expected ),
			actual,
			expected,
			message
		} );
	}

	notPropEqual( actual, expected, message ) {
		actual = objectValues( actual );
		expected = objectValues( expected );

		this.pushResult( {
			result: !equiv( actual, expected ),
			actual,
			expected,
			message,
			negative: true
		} );
	}

	deepEqual( actual, expected, message ) {
		this.pushResult( {
			result: equiv( actual, expected ),
			actual,
			expected,
			message
		} );
	}

	notDeepEqual( actual, expected, message ) {
		this.pushResult( {
			result: !equiv( actual, expected ),
			actual,
			expected,
			message,
			negative: true
		} );
	}

	strictEqual( actual, expected, message ) {
		this.pushResult( {
			result: expected === actual,
			actual,
			expected,
			message
		} );
	}

	notStrictEqual( actual, expected, message ) {
		this.pushResult( {
			result: expected !== actual,
			actual,
			expected,
			message,
			negative: true
		} );
	}

	[ "throws" ]( block, expected, message ) {
		let actual,
			result = false,
			currentTest = ( this instanceof Assert && this.test ) || config.current;

		// 'expected' is optional unless doing string comparison
		if ( objectType( expected ) === "string" ) {
			if ( message == null ) {
				message = expected;
				expected = null;
			} else {
				throw new Error(
					"throws/raises does not accept a string value for the expected argument.\n" +
					"Use a non-string object value (e.g. regExp) instead if it's necessary."
				);
			}
		}

		currentTest.ignoreGlobalErrors = true;
		try {
			block.call( currentTest.testEnvironment );
		} catch ( e ) {
			actual = e;
		}
		currentTest.ignoreGlobalErrors = false;

		if ( actual ) {
			let expectedType = objectType( expected );

			// We don't want to validate thrown error
			if ( !expected ) {
				result = true;
				expected = null;

			// Expected is a regexp
			} else if ( expectedType === "regexp" ) {
				result = expected.test( errorString( actual ) );

			// Expected is a constructor, maybe an Error constructor
			} else if ( expectedType === "function" && actual instanceof expected ) {
				result = true;

			// Expected is an Error object
			} else if ( expectedType === "object" ) {
				result = actual instanceof expected.constructor &&
					actual.name === expected.name &&
					actual.message === expected.message;

			// Expected is a validation function which returns true if validation passed
			} else if ( expectedType === "function" && expected.call( {}, actual ) === true ) {
				expected = null;
				result = true;
			}
		}

		currentTest.assert.pushResult( {
			result,
			actual,
			expected,
			message
		} );
	}
}

// Provide an alternative to assert.throws(), for environments that consider throws a reserved word
// Known to us are: Closure Compiler, Narwhal
// eslint-disable-next-line dot-notation
Assert.prototype.raises = Assert.prototype[ "throws" ];

/**
 * Converts an error into a simple string for comparisons.
 *
 * @param {Error} error
 * @return {String}
 */
function errorString( error ) {
	let resultErrorString = error.toString();

	if ( resultErrorString.substring( 0, 7 ) === "[object" ) {
		let name = error.name ? error.name.toString() : "Error";
		let message = error.message ? error.message.toString() : "";

		if ( name && message ) {
			return `${name}: ${message}`;
		} else if ( name ) {
			return name;
		} else if ( message ) {
			return message;
		} else {
			return "Error";
		}
	} else {
		return resultErrorString;
	}
}

export default Assert;
