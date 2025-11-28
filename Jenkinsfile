pipeline {
  agent {
    docker {
      image 'node:20-alpine'
      args '-v $HOME/.npm:/root/.npm -v /var/run/docker.sock:/var/run/docker.sock'
      reuseNode true
    }
  }

  environment {
    CI                   = 'true'
    REGISTRY_URL        = 'registry.dsp5-archi-f24a-15m-g4-2025-akf.fr'
    IMAGE_NAME          = 'tiptop/front'
    REGISTRY_CREDENTIAL = 'registry-creds'          // credentialsId (user/pass) dans Jenkins
    DEPLOY_HOST         = '35.233.110.250'          // VM cible
    DEPLOY_USER         = 'docker'                  // utilisateur SSH sur la VM
    DEPLOY_SSH_CRED     = 'gcp-ssh'                 // credentialsId SSH dans Jenkins
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install') {
      steps { sh 'npm ci' }
    }

    stage('Lint') {
      steps { sh 'npm run lint' }
    }

    stage('Build') {
      steps { sh 'npm run build' }
    }

    stage('Docker Build & Push') {
      steps {
        sh 'apk add --no-cache docker-cli'
        withCredentials([usernamePassword(credentialsId: REGISTRY_CREDENTIAL, usernameVariable: 'REG_USER', passwordVariable: 'REG_PASS')]) {
          sh """
            echo "$REG_PASS" | docker login ${REGISTRY_URL} -u "$REG_USER" --password-stdin
            docker build -t ${REGISTRY_URL}/${IMAGE_NAME}:${BUILD_NUMBER} .
            docker push ${REGISTRY_URL}/${IMAGE_NAME}:${BUILD_NUMBER}
          """
        }
      }
    }

    stage('Deploy') {
      steps {
        sshagent(credentials: [DEPLOY_SSH_CRED]) {
          sh """
            ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} '
              docker login ${REGISTRY_URL} && \
              docker pull ${REGISTRY_URL}/${IMAGE_NAME}:${BUILD_NUMBER} && \
              docker stop tiptop-front || true && docker rm tiptop-front || true && \
              docker run -d --name tiptop-front -p 80:80 ${REGISTRY_URL}/${IMAGE_NAME}:${BUILD_NUMBER}
            '
          """
        }
      }
    }

    stage('Archive') {
      steps {
        archiveArtifacts artifacts: 'dist/**', fingerprint: true, onlyIfSuccessful: true
      }
    }
  }

  post {
    always { cleanWs() }
  }
}
