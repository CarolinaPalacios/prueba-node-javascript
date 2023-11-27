import {
  ping,
  obtenerDatosPromise,
  procesarArchivoPromise,
  procesarArchivo,
  leerArchivos,
  delay,
} from '../solutions/index.js';

import { describe, it, beforeEach, afterEach } from 'node:test';
import { equal, ifError } from 'node:assert/strict';
import { unlinkSync, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

describe('1. ping', () => {
  it('1.1. ping caro.de', (_, done) => {
    ping('caro.de', (err, info) => {
      ifError(err);
      equal(info.ip, 'caro.de');
      done();
    });
  });
});

describe('2. obtenerDatosPromise', () => {
  it('2.1. obtenerDatosPromise', async () => {
    const { data } = await obtenerDatosPromise({ time: 1 });
    equal(data, 'datos importantes');
  });
});

describe('3. procesarArchivoPromise', () => {
  afterEach(() => {
    try {
      unlinkSync('output.txt');
    } catch {}
  });

  it('3.1. procesarArchivo', (t, done) => {
    writeFileSync('input.txt', 'gogogo');
    procesarArchivo((err) => {
      ifError(err);
      readFile('output.txt', 'utf8').then((contenido) => {
        equal(contenido, 'GOGOGO');
        done();
      });
    });
  });

  it('3.1. procesarArchivoPromise', async () => {
    writeFileSync('input.txt', 'hola');
    await procesarArchivoPromise();
    const contenido = await readFile('output.txt', 'utf8');
    equal(contenido, 'HOLA');
  });
});

describe('4. leerArchivos', () => {
  // it('4.1. leerArchivos', () => {
  //   const mensaje = leerArchivos();
  //   equal(mensaje, 'hola qué tal');
  // });

  it('4.1. leerArchivos', async () => {
    const mensaje = await leerArchivos();
    equal(mensaje, 'hola qué tal');
  });
});

describe('5. delay', () => {
  it('5.1. delay returns a promise', () => {
    const result = delay(1000);
    equal(result instanceof Promise, true);
  });

  it('5.2. delay resolves after the specified time', async () => {
    const startTime = Date.now();
    await delay(1000);
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    equal(elapsedTime >= 1000 && elapsedTime <= 1100, true);
  });

  it('5.3. delay with invalid time throws an exception', async () => {
    try {
      await delay('invalid');
    } catch (error) {
      equal(error instanceof Error, true);
    }
  });
});
