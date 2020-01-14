const core = require('@actions/core')
const exec = require('@actions/exec')
const path = require('path')
const fs = require('fs')

const env = process.env
const cfg = {}

async function main() {
  readConfig()
  await buildImage()
  await runCommand()
}

async function runCommand() {
  await exec.exec('docker', ['run', ...cfg.options, ...cfg.environment, ...cfg.volumes, cfg.tag, cfg.cmd])
}

function readConfig() {
  // local docker image tag
  cfg.tag = 'pentaho/mvn'

  // docker options
  cfg.options = ['--rm']
  const inputPath = core.getInput('path')
  if (inputPath) {
    cfg.options.push('--workdir', path.join('/workspace', inputPath))
  }

  // volume binds
  cfg.volumes = [
    '-v', '/var/run/docker.sock:/var/run/docker.sock'
  ]

  if (env.MVN_WORSPACE_PATH) {
    cfg.volumes.push('-v', `${env.MVN_WORSPACE_PATH}:/workspace`)
  } else {
    cfg.volumes.push('-v', `${env.GITHUB_WORKSPACE}:/workspace`)
  }

  const cacheDir = env.MVN_CACHE_PATH
  if (cacheDir) {
    // need to create if does not exist, for some reason is created as root by default
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true })
    cfg.volumes.push('-v', `${cacheDir}:/cache`)
  }

  const inputVolumes = core.getInput('volumes')
  if (inputVolumes) {
    inputVolumes.forEach(volume => cfg.volumes.push('-v', volume))
  }

  // environment
  cfg.environment = []
  if (env.CACHE_PATH) {
    cfg.environment.push('-e', 'CACHE_PATH')
  }

  // mvn command
  cfg.cmd = `mvn -B ${core.getInput('args')}`
}

async function buildImage() {
  // relative to the location of the packaged file
  let ctx = path.join(__dirname, '../docker')
  await exec.exec('docker', ['build', '-t', cfg.tag, ctx])
}

main()
  .catch((error) => {
    core.setFailed(error.message)
  })