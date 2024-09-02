import { execFile } from "node:child_process"

export async function run(name: string, command: string, args: string[]) {

  const logger = consola.withTag(name)

  const p = execFile(command, args)

  logger.info('Running process', p.spawnfile, `(${p.pid ?? '?'})`, '...')

  let stdout = ""
  p.stdout?.on('data', (c) => stdout += c)

  let stderr = ""
  p.stderr?.on('data', (c) => stderr += c)

  // Listen for any errors
  p.addListener('error', e => logger.error(e))

  // Wait for process to finish
  await new Promise(r => p.addListener('exit', r))

  if (p.exitCode === 0) {
    logger.success('finished!')

    return {
      stdout, stderr
    }
  }

  logger.error(stderr)

  throw createError({ message: stderr })
}