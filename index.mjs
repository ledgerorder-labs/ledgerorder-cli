import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
export async function run(inputPath, moduleUrl=new URL('../ledgerorder-core/index.mjs',import.meta.url)) {
  const raw=await readFile(inputPath); const input=JSON.parse(raw);
  const engine=await import(moduleUrl.href);
  const result=engine.compare(input.left,input.right);
  return {...result,provenance:{inputSha256:createHash('sha256').update(raw).digest('hex'),engine:'ledgerorder-core@0.1.0',source:'local-file'}};
}
