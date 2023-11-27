import net from 'node:net';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
// import { promisify } from 'node:util';

export const ping = (ip, callback) => {
  const startTime = process.hrtime();

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end();
    callback(null, { time: process.hrtime(startTime), ip });
  });
  client.on('error', (err) => {
    callback(err);
    client.end();
  });
};

export function obtenerDatosPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'datos importantes' });
    }, 2000);
  });
}

// const obtenerDatos = promisify(obtenerDatosPromise);

export function procesarArchivo(callback) {
  const handleWrite = (error) => {
    if (error) {
      console.error('Error guardando archivo:', error.message);
      callback(error);
    }

    console.log('Archivo procesado y guardado con éxito');
    callback(null);
  };
  const handleReadFile = (error, contenido) => {
    if (error) {
      console.error('Error leyendo archivo:', error.message);
      callback(error);
    }

    const textoProcesado = contenido.toUpperCase();

    fs.writeFile('output.txt', textoProcesado, handleWrite);
  };

  fs.readFile('input.txt', 'utf8', handleReadFile);
}

export async function procesarArchivoPromise() {
  let contenido = '';
  contenido = await fsp.readFile('input.txt', 'utf8').catch((error) => {
    console.error('Error leyendo archivo:', error.message);
    throw error;
  });

  const textoProcesado = contenido.toUpperCase();

  try {
    await fsp.writeFile('output.txt', textoProcesado);
  } catch (error) {
    console.error('Error guardando archivo:', error.message);
    throw error;
  }
}

export async function leerArchivos() {
  const [archivo1, archivo2, archivo3] = await Promise.allSettled([
    fsp.readFile('archivo1.txt', 'utf8'),
    fsp.readFile('archivo2.txt', 'utf8'),
    fsp.readFile('archivo3.txt', 'utf8'),
  ]);

  const message = [archivo1.value, archivo2.value, archivo3.value]
    .filter((value) => typeof value !== 'undefined')
    .join(' ');

  console.log(message);
  return message;
}

export async function delay(time) {
  if (typeof time !== 'number') throw new Error('time must be a number');
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
