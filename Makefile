install:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test:
	npm test

test-coverage:
	npx jest --coverage

.PHONY: test