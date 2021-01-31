install: install-deps

install-deps:
	npm ci

serve:
	npm run serve

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

publish:
	npm publish

publish-dry-run:
	npm publish --dry-run

.PHONY: test