pipeline {
  agent any

  parameters {
    string(name: 'IMAGE_NAME', defaultValue: 'jagmohandixit/career_docker', description: 'Docker Image Name')
    string(name: 'KUBE_CONFIG_ID', defaultValue: 'kubeconfig-id', description: 'Jenkins credential ID for kubeconfig')
    string(name: 'DOCKERHUB_CREDS_ID', defaultValue: 'dockerhub-creds', description: 'Jenkins credential ID for Docker Hub')
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/Jagmohan-Dixit/Career-Counselling-With-AI-Agent.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          docker.build("${params.IMAGE_NAME}:latest")
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withDockerRegistry([credentialsId: params.DOCKERHUB_CREDS_ID, url: '']) {
          script {
            docker.image("${params.IMAGE_NAME}:latest").push()
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        withKubeConfig([credentialsId: params.KUBE_CONFIG_ID]) {
          sh 'kubectl apply -f deployment.yaml'
          sh 'kubectl apply -f service.yaml'
        }
      }
    }
  }

  post {
    success {
      echo 'Deployment successful!'
    }
    failure {
      echo 'Deployment failed.'
    }
  }
}
