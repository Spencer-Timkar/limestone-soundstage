import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const source = readFileSync(new URL('../app/api/subscribe/route.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
const route = { exports: {} };
new Function('require', 'module', 'exports', outputText)(require, route, route.exports);

for (const payload of ['null', '[]', '"email@example.com"', '{}', '{"email":"invalid"}', '{']) {
    test(`reject malformed signup payload: ${payload}`, async () => {
        const response = await route.exports.POST(new Request('http://localhost/api/subscribe', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload,
        }));
        assert.equal(response.status, 400);
        assert.equal((await response.json()).message, 'Please enter a valid email address.');
    });
}
